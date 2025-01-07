# cascading-select

Web Component für voneinander abhängige `<select>` Formularelemente, bei der die verfügbaren Optionen in einer untergeordneten Auswahlliste auf der Auswahl in einer übergeordneten Liste basieren. Das Muster ist auch als "dependent select" (eine Unterform des generischen "input-dependent input") oder "cascading dropdowns" bekannt.

<!--
## Installation

```
yarn install @webfactory/cascading-select
```
-->

## Verwendung

Die Web Component `<cascading-select>` ist ein leichtgewichtiger Wrapper für Standard Formular-Markup. Die Nutzung von `<fieldset>`, `<legend>`, `<label>` sowie weiterer Elemente oder Klassen, die für Layout und Styling nötig sind, bleibt dabei komplett flexibel.

1. Die JS-Datei "cascading-select.js" muss geladen werden. Je nach Anforderungen an Browser Support ist eine Transpilierung für alte Browser empfehlenswert.
2. Innerhalb der Web Component müssen zwei `<select>` Elemente ausgegeben werden.
3. Das "parent" `<select>` bzw. die "control" benötigt ein Attribut `data-dependent-id`, das als Wert die `id` des "dependent" `<select>` enthält, um die beiden Felder zu verknüpfen.
4. Die `<option>`s des "parent" `<select>`, für die es eine Unterauswahl in zweiter Ebene gibt, benötigen ein Attribut `data-dependent-options`, das als Wert ein JSON-formatiertes Array von Objekten mit jeweils einem `label` und `value` enthält. Leere Platzhalter-Optionen müssen ebenfalls aufgeführt werden.
5. Das "dependent" `<select>` benötigt ein `id`-Attribut mit der in Schritt 3 verwendeten ID.

## Parameter

Web Components unterstützen allgemeine HTML-Attribute, können aber auch eigene als Parameter empfangen.

Option | Type    | Default | Description
------ |---------|---------| -----------
always-show-dependent | boolean | false | Steuert initiale Anzeige des zweiten ("dependent") `<select>`, wenn im ersten ("parent") keine Auswahl bzw. eine Option ohne Unterauswahlmöglichkeiten ausgewählt ist. Default: das zweite Feld ist ausgeblendet. Bei vorhandenem Parameter wird es angezeigt und mit `aria-disabled` ausgezeichnet (in der Annahme, dass es keine sinnvolle Interaktivität hat, bis im "parent" eine Auswahl getroffen wurde, aber trotzdem sichtbar sein soll, um visuell auf das funktionale Muster hinzuweisen.

## Beispiel

```
<cascading-select>
    <fieldset>
        <legend>Wo willst du bouldern gehen?</legend>
        <div>
            <label for="town">Stadt</label>
            <select id="town" name="town"data-dependent-id="halle">
                <option value="">Bitte wähle eine Stadt</option>
                <option
                    value="1"
                    data-dependent-options='[
                        { "value": "", "label": "Bitte wähle eine Halle" },
                        { "value": "d11", "label": "Boulders Habitat Bonn" },
                        { "value": "d12", "label": "Boulders Habitat Beuel" }
                    ]'
                >
                    Bonn
                </option>
                <option
                    value="2"
                    data-dependent-options='[
                        { "value": "", "label": "Bitte wähle eine Halle" },
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
                        { "value": "", "label": "Bitte wähle eine Halle" },
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
            <label for="halle">Halle</label>
            <select id="halle" class="form-control"></select>
        </div>
    </fieldset>
</cascading-select>
```
