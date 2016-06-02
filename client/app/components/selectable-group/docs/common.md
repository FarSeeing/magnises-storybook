### group it!

`selectable-group` create and group up [`selectable`](components/selectable/touching) components, 
you have to just pass info about it as JSON to options parameter, for example:

```json
{
  values: [
      {label: 'first', value: 'first value'},
      {label: 'second', value: 'second value'},
      {label: 'third', value: 'third value'}
    ]
}
```

### Parameters

| parameter name         | description                                    |
| ----------------       | -------------                                  |
| ngModel                | current selected value                         |  
| options                | JSON object for selectable group configuration |
| options.mainLabel      | main label for list of selectable items        |
| options.values         | generated `selectable`'s values                |
| options.values[].label | `selectable`'s' label                          |
| options.values[].value | `selectable`'s' value
'

All the magic happens with options object with will be user to generate selectable iterms,
so it contain almost all information about selectable group. `Options` parameter contain 
`mainLabel` and `values`. `mainLable` is just a string which used as label, when `values`
contain info about what `selectable` items shoud be generated, for each `selectable` item
you shoud pass `label` and `value`, which will be used as generated `selectable`'s' label and value
accordingly.
