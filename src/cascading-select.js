class CascadingSelect extends HTMLElement {
        static get observedAttributes() {
            return ["always-show-dependent"];
        }

    constructor() {
        super();

        this.alwaysShowDependent = this.hasAttribute('always-show-dependent');
    }

    connectedCallback() {
        this._connect();
    }

    disconnectedCallback() {
        this.parentSelect.removeEventListener('change', this.updateDependentSelect);
    }

    _connect() {
        if (this.children.length) {
            this._init();
            return;
        }

        // Children from the Light DOM not yet available, watch it for init
        this._observer = new MutationObserver(this._init.bind(this));
        this._observer.observe(this, { childList: true });
    }

    _init() {
        if (this.initialized) {
            return;
        }

        this.parentSelect = this.querySelector('[data-dependent-id]');
        this.dependentSelectId = this.parentSelect.getAttribute('data-dependent-id');
        this.dependentSelect = this.querySelector(`#${this.dependentSelectId}`);
        this.dependentLabel = this.querySelector(`[for=${this.dependentSelectId}]`);
        this.initiallySelectedDependentOptionValue = this.dependentSelect.value;

        this.parentSelect.addEventListener('change', this.updateDependentSelect.bind(this));

        this.updateDependentSelect();

        this.initialized = true;
    }

    updateDependentSelect() {
        const selectedParentOption = this.parentSelect.options[this.parentSelect.selectedIndex];
        const selectedParentOptionDependents = selectedParentOption.dataset.dependentOptions;
        let hasInitiallySelectedOption = false;

        if (selectedParentOptionDependents) {
            const dependentOptionsData = JSON.parse(selectedParentOptionDependents);

            this.dependentSelect.innerHTML = '';

            dependentOptionsData.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;

                // select.value always returns and thus this.initiallySelectedDependentOptionValue always contains a string;
                // we need to make sure the option.value retrieved from data-dependent-options (JSON) is also a string
                if (!this.initialized && option.value.toString() === this.initiallySelectedDependentOptionValue) {
                    hasInitiallySelectedOption = true;
                }

                this.dependentSelect.appendChild(optionElement.cloneNode(true));
            });

            if (hasInitiallySelectedOption) {
                this.dependentSelect.value = this.initiallySelectedDependentOptionValue;
            }

            this.enableDependent();
            this.showDependent();
        } else {
            this.setInactiveDependentVisibility();
        }
    }

    setInactiveDependentVisibility() {
        if (this.alwaysShowDependent) {
            this.disableDependent();
            this.showDependent();
        } else {
            this.hideDependent();
        }
    }

    enableDependent() {
        this.dependentSelect.removeAttribute("aria-disabled");
    }

    disableDependent() {
        this.dependentSelect.setAttribute("aria-disabled", "true");
    }

    showDependent() {
        this.dependentLabel.removeAttribute("hidden");
        this.dependentSelect.removeAttribute("hidden");
    }

    hideDependent() {
        this.dependentLabel.setAttribute("hidden", "hidden");
        this.dependentSelect.setAttribute("hidden", "hidden");
    }
}

customElements.define('cascading-select', CascadingSelect);
