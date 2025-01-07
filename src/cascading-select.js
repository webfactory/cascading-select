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

        // not yet available, watch it for init
        this._observer = new MutationObserver(this._init.bind(this));
        this._observer.observe(this, { childList: true });
    }

    _init() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;

        this.parentSelect = this.querySelector('[data-dependent-id]');
        this.dependentSelect = this.querySelector(`#${this.parentSelect.getAttribute('data-dependent-id')}`);
        this.dependentLabel = this.querySelector(`[for=${this.dependentSelect.id}]`);

        this.parentSelect.addEventListener('change', this.updateDependentSelect.bind(this));

        this.updateDependentSelect();
    }

    updateDependentSelect() {
        const targetSelect = this.parentSelect;
        const selectedOption = targetSelect.options[targetSelect.selectedIndex];
        const selectedOptionDependents = selectedOption.dataset.dependentOptions;

        if (selectedOptionDependents) {
            const dependentOptionsData = JSON.parse(selectedOption.dataset.dependentOptions);

            this.dependentSelect.innerHTML = '';

            dependentOptionsData.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                this.dependentSelect.appendChild(optionElement.cloneNode(true));
            });

            this.enableDependent();
            this.showDependent();
        } else {
            this.setInactiveDependentVisibility();
            this.dependentSelect.options[0].selected = true;
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
