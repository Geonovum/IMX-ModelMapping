# YAML IMX Model Mapping specification

A <dfn>YAML IXM Model Mapping document</dfn> is a concrete representation of an instance of a [=model mapping=] expressed in [[YAML]].

## Encoding

A [=YAML IXM Model Mapping document=] MUST be encoded in [[UTF-8]].

## Mapping definitions

### `ModelMapping`
The root node of a mapping document represents the [=model mapping=].

A `ModelMapping` node MUST express zero or one `objectTypeMappings` key, of which the value is a map of [=object type mapping=] nodes.

<aside class="issue">
What is the behavior when no `objectTypeMappings` key is expressed? This might be useful behavior when source and target models are identical.
</aside>

<aside class="example" title="model mapping root node">

  ```yaml
  sourceModels: ... # TODO
  targetModel: ... # TODO
  objectTypeMappings: ...
  ```
</aside>

### `SourceModel`

<aside class="issue">TODO: Still to be worked out in following high 5s</aside>

A <dfn>model alias</dfn> is a string which defines an alias which can be used to define a [=source root=], or in [=property path expressions=].

### `TargetModel`

<aside class="issue">TODO: Still to be worked out in following high 5s</aside>

### `ObjectTypeMapping`

An `ObjectTypeMapping` node expresses an [=object type mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping) within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `objectTypeMappings` key. The key in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the `objectTypeName` of the [=object type mapping=].

An `ObjectMapping` node MUST have a `sourceRoot` key, whose value is a [=object type reference=]. A <dfn>source root</dfn> defines the object type of the root node of a [=property path=].

An <dfn>object type reference</dfn> is a string with the following pattern `{modelAlias}:{objectTypeName}`, where `{modelAlias}` is the [=model alias=] of a source model, and `{objectTypeName}` is the name of the [=object type=] in that source model.

An `ObjectMapping` node MUST have zero or one `propertyMappings` key, whose value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing `PropertyMapping` nodes.

<aside class="example" title="object type mapping">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings: ...
  ```
</aside>

### `PropertyMapping`

A `PropertyMapping` node expresses a [=property mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping) within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `propertyMappings` key. The key in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the `propertyName` of the [=Property Mapping=].

A `PropertyMapping` node MUST have one `pathMappings` or `pathMapping` key, whose value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) representing `PropertyPathMapping` nodes, or [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a `PropertyPathMapping` node respectively.

The evaluation of the `PropertyPathMapping`(s) SHOULD yield a result that matches the type of the [=property=] in the target model which is referenced by `propertyName`.

<aside class="example" title="property mapping">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        addressID:
          pathMappings:
            - path: identificatie
        postCode:
          pathMapping:
            path: postcode
  ```
</aside>

### `PropertyPathMapping`

A `PropertyPathMapping` node expresses a [=property path mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping), or a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar), within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `pathMappings` key.

A <dfn>key/value `PropertyPathMapping` node</dfn> MUST have one `paths` or `path` key, whose value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) representing [=property path expressions=], or [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a [=property path expression=] respectively.
 
A string scalar `PropertyPathMapping` node is a [=property path expression=].

A <dfn data-lt="property path expressions">property path expression</dfn> is a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar) that expresses a [=property path=]. [=Segments=] of the [=property path=] are separated by a `/` character.

<aside class="issue">
We probably need a more formal description of which characters are allowed in a [=property path expression=].
</aside>

A [=key/value `PropertyPathMapping` node=] MUST have zero or one `combiner` key, whose value is a [=combiner=].


A [=key/value `PropertyPathMapping` node=] MUST have zero or one `transform` key, whose value is a [=transform=].

<aside class="example" title="property path mapping">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        addressID:
          pathMapping: identificatie
        postCode:
          pathMapping:
            path: postcode
        postName:
          pathMapping:
            paths:
              - ligtIn/naam
              - ligtAan/ligtIn/naam
  ```
</aside>

### `Combiner`

A `Combiner` is a function that takes the [=property-path-mapping-result=] of the previous [=property path mapping=] in the [=property-path-mapping-sequence=], and the result of the [=property-path-mapping-result=] on which it is declared, and applies the defined function on these.

If no combiner is specified on a [=`PropertyPathMapping`=] the [=default combiner=] is applied.

<aside class="example" title="combiner">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        fullAddress:
          pathMappings:
            - ligtAan/naam
            - path: huisnummer
              combiner:
                name: concat
                prefix: ' '
            - path: huisletter
              combiner:
                name: concat
                prefix: ' '
            - path: huisnummertoevoeging
              combiner:
                name: concat
                prefix: '-'
            - path: postcode
              combiner:
                name: concat
                prefix: ' '
            - paths:
                - ligtIn/naam
                - ligtAan/ligtIn/naam
              combiner:
                name: concat
                prefix: ' '
  ```
</aside>

#### Default `Combiner`

<!-- The default `combiner`takes
  1. takes the [=property-path-mapping-result=] of the previous [=property path mapping=] in the [=property-path-mapping-sequence=], if it exists.<br> 
  If that [=property-path-mapping-result=] is non-null, then the combiner returns that value as the [=property-mapping-result=]
  2. if it doesn't exist, or is null, the combiner applies 1 -->

### `Transform`

A `Transform` is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a function that takes the [=property-path-expression-result=] and transforms it returning a new result.


<aside class="example" title="transform">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        isMainAddress:
          pathMapping:
            path: isHoofdadresVan/identificatie
            transform: nonNull
  ```
</aside>

<aside class="issue">
TODO: describe how to define custom transforms? Or is this a different spec?
</aside>
