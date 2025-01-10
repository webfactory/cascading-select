# <cascading-select>

Web Component for interdependent `<select>` form elements, where the available options in a dependent selection list are based on the selection in a parent or control list. This pattern is also known as "dependent select" (a subform of the generic "input-dependent input") or "cascading dropdowns".

## Installation

```
npm install @webfactoryde/cascading-select
```

## Usage

The `<cascading-select>` Web Component is a lightweight wrapper for standard form markup. If offers complete flexibility in regard to the use of `<fieldset>`, `<legend>`, `<label>` and other elements or attributes (i. e. `class`) needed for layout and styling, as long as two `<select>` elements with the necessary (data-) attributes are present.

### Steps to implement:

1. The JS file "cascading-select.js" must be loaded. Depending on browser support requirements, transpilation for older browsers is recommended.
2. Two `<select>` elements must be output within the Web Component.
3. The parent `<select>` requires a `data-dependent-id` attribute that contains the `id` of the dependent `<select>` as its value to link the two fields.
4. The `<option>`s of the parent `<select>` that have a sub-selection at the second level require a `data-dependent-options` attribute with a JSON-formatted array of objects, each containing a `label` and `value`. Empty placeholder options must also be listed.
5. The dependent `<select>` requires an `id` attribute with matches the value used for `data-dependent-id` on the parent.

## Parameters

Web Components support common HTML attributes but can also receive custom parameters.

| Option               | Type    | Default | Description|
|-----------------------|---------|---------|-----------|
| always-show-dependent | boolean | false | Controls initial display of the second ("dependent") `<select>` when no selection is made in the first ("parent") or an option without sub-selection possibilities is selected. Default: the second field is hidden. When the parameter is present, it is displayed and marked with `aria-disabled` (assuming it has no meaningful interactivity until a selection is made in the "parent", but should still be visible to visually indicate the functional pattern).|

## Example

```
<cascading-select>
    <fieldset>
        <legend>Where do you want to go bouldering?</legend>
        <div>
            <label for="town">City</label>
            <select id="town" name="town" data-dependent-id="gym">
                <option value="">Please choose a city</option>
                <option
                    value="1"
                    data-dependent-options='[
                        { "value": "", "label": "Please choose a gym" },
                        { "value": "d11", "label": "Boulders Habitat Bonn" },
                        { "value": "d12", "label": "Boulders Habitat Beuel" }
                    ]'
                >
                    Bonn
                </option>
                <option
                    value="2"
                    data-dependent-options='[
                        { "value": "", "label": "Please choose a gym" },
                        { "value": "d21", "label": "Boulderplanet" },
                        { "value": "d22", "label": "Stuntwerk Köln" },
                        { "value": "d23", "label": "Kletterfabrik" },
                        { "value": "d24", "label": "K11" }
                    ]'
                >
                    Köln
                </option>
                <option
                    value="3"
                    data-dependent-options='[
                        { "value": "", "label": "Please choose a gym" },
                        { "value": "d31", "label": "Monolith" },
                        { "value": "d32", "label": "Boulderfactory" },
                        { "value": "d33", "label": "KletterBar" }
                    ]'
                >
                    Münster
                </option>
            </select>
        </div>
        <div>
            <label for="gym">Gym</label>
            <select id="gym" class="form-control"></select>
        </div>
    </fieldset>
</cascading-select>
```
