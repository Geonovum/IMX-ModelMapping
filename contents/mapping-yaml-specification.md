# YAML IMX Model Mapping specification

A <dfn>YAML IXM Model Mapping document</dfn> is a concrete representation of an instance of a [=model mapping=] expressed in [[YAML]].

## Encoding

A [=YAML IXM Model Mapping document=] MUST be encoded in [[UTF-8]].

## Mapping definitions

### `ModelMapping`
The root node of a mapping document represents the [=model mapping=].
A `ModelMapping` node MUST express exactly one `sourceModels` key, of which the value is a map of [=sourcemodel=] nodes.

A `ModelMapping` node MUST express zero or one `objectTypeMappings` key, of which the value is a map of [=object type mapping=] nodes.

<aside class="issue">
What is the behavior when no `objectTypeMappings` key is expressed? This might be useful behavior when source and target models are identical.
</aside>

<aside class="example" title="model mapping root node">

  ```yaml
  sourceModels: ...
  targetModel: ...
  pathMappings: ...
  objectTypeMappings: ...
  ```
</aside>

### `SourceModel`

<aside class="issue">TODO: Still to be worked out in following high 5s</aside>

<!-- A <dfn>model alias</dfn> is a string which defines an alias which can be used to define a [=source root=], or in [=property path expressions=]. -->

### `TargetModel`

<aside class="issue">TODO: Still to be worked out in following high 5s</aside>

### `ObjectTypeMapping`

An `ObjectTypeMapping` node expresses an [=object type mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping) within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `objectTypeMappings` key. The key in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the `objectTypeName` of the [=object type mapping=].

An `ObjectMapping` node MUST have a `sourceRoot` key, which represents the [=source root=] and whose value is a [=object type reference=].

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

### `PropertyPath`

A property path node expresses a [=property path=]. It is represented by a [mapping node](https://yaml.org/spec/1.2.2/#mapping), or a [=property path expression=].

A <dfn>mapping-node-property-path</dfn> MUST have exactly one `expression` key, whose value is a [`property path expression`].

A [=mapping-node-property-path=] MUST have zero or one `combiner` key, whose value is a [=combiner=].

A <dfn>property path expression</dfn> is a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar) that expresses a [=property path=]. [=Segments=] of the [=property path=] are separated by a `/` character.

<aside class="issue">
We probably need a more formal description of which characters are allowed in a [=property path expression=].
</aside>

### `Combiner`

A `Combiner` expresses a [=combiner=].

If no combiner is specified on a [=`PropertyPathMapping`=] the [=default combiner=] is applied.

<aside class="example" title="combiner">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        fullAddress:
          pathMappings:
            - path: ligtAan/naam
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
              map:
                name: concat
                options:
                  prefix: ' '
          combine:
            name: join
  ```
</aside>


#### Default `combiner`

The <dfn>default `combiner`</dfn> is the `coalesce` combiner.

The [=default combiner=] takes the previous result in the sequence, if it exists.
  - If that result is non-null, then the combiner returns that value as the result.
  - otherwise the combiner evalueates the current value in the sequence.

The last combiner in a sequence will always return its result.

The following example:

<aside class="example" title="combiner">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        fullAddress:
          pathMappings:
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

is equivalent to:

<aside class="example" title="combiner">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        fullAddress:
          pathMappings:
            - path: postcode
              combiner:
                name: concat
                prefix: ' '
            - paths:
                - expression: ligtIn/naam
                  combiner: coalesce
                - expression: ligtAan/ligtIn/naam
                  combiner: coalesce
              combiner:
                name: concat
                prefix: ' '
  ```
</aside>

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
