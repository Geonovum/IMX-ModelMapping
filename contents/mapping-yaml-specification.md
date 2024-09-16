# YAML IMX Model Mapping specification

A <dfn>YAML IXM Model Mapping document</dfn> is a concrete representation of an instance of a [=model mapping=] expressed in [[YAML]].

## Encoding

A [=YAML IXM Model Mapping document=] MUST be encoded in [[UTF-8]].

## Mapping definitions

### `ModelMapping`
The root node of a mapping document, the <dfn>`ModelMapping` node</dfn> represents the [=model mapping=].

A [=ModelMapping node=] MUST express exactly one `sourceModels` key, of which the value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) of [=SourceModel nodes=].

A [=ModelMapping node=] MUST express exactly one `targetModel` key, of which the value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) of [=TargetModel nodes=].

A [=ModelMapping node=] MUST express zero or one `sourceRelations` key, of which the value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) of [=SourceRelation nodes=].

A [=ModelMapping node=] MUST express zero or one `objectTypeMappings` key, of which the value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) of [=ObjectTypeMapping nodes=].

<!-- <aside class="issue">
What is the behavior when no `objectTypeMappings` key is expressed? This might be useful behavior when source and target models are identical.
</aside> -->

<aside class="example" title="model mapping root node">

```yaml
sourceModels: ...
targetModel: ...
sourceRelations: ...
objectTypeMappings: ...
```
</aside>

### `SourceModel`

A <dfn>`SourceModel` node</dfn> expresses a [=source model=]. It is represented by a [sequence node](https://yaml.org/spec/1.2.2/#sequence) of [key/value pairs](https://yaml.org/spec/1.2.2/#mapping). The key of each [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the [=model alias=] of the [=source model=]. The value in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is a [=ModelReference node=] referencing the [=source model=] definitions.

### `TargetModel`
A <dfn>`TargetModel` node</dfn> expresses a [=target model=]. It is represented by a 
[key/value pair](https://yaml.org/spec/1.2.2/#mapping). The key of the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the [=model alias=] of the [=target model=]. The value in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is a [=ModelReference node=] referencing the [=target model=] definitions.

### `ModelReference`
A <dfn>`ModelReference` node</dfn> is represented by a [mapping node](https://yaml.org/spec/1.2.2/#mapping). 
The [mapping node](https://yaml.org/spec/1.2.2/#mapping) MUST have:
- a key `location`, whose value is a string which expresses the file path of the mapping source file.
- a key `profile`, whose value is a string which identifies the profile of the model. The profile will be used to by the orchestration engine to load the model using the appropriate model loader.

<aside class="example" title="source and target model specification">

```yaml
sourceModels:
  - bag:
      location: /models/bag/imbag.xml
      profile: MIM
  - bgt:
      location: /models/imgeo/imgeo.xml
      profile: MIM

targetModel:
  imx-geo:
    location: /models/imx-geo/imx-geo.xml
    profile: MIM

objectTypeMappings: ...
```
</aside>

### `SourceRelation`

A <dfn>`SourceRelation` node</dfn> expresses a [=source relation mapping=]. It is represented by a [mapping node](https://yaml.org/spec/1.2.2/#mapping). 

It MUST have a `sourceType` key, whose value is an [=ObjectTypeRef node=].

It MUST have a `property` key, whose value is a [=Property node=].

### `Property`

A <dfn>`Property` node</dfn> is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a [=relation=] [=property=].

It MUST have a `name` key with a string value representing the name of the [=relation=].

It MUST have a `target` key with an [=ObjectTypeRef node=] value, representing the target [=object type=] of the [=relation=].

It MUST have a `multiplicity` key with a valid multiplicity string value.

It MUST have an `inverseName` key with a string value representing the inverse name of the [=relation=].

It MUST have an `inverseMultiplicity` key with a string value representing the inverse multiplicity of the [=relation=].

It MUST either have:
* a `keyMapping` key whose value is a [=KeyMapping node=].
* a `filterMappings` key whose value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) of [=FilterMapping nodes=].

### `KeyMapping`

A <dfn>`KeyMapping` node</dfn> is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) which defines the match of a [=source relation mapping=]'s target object's key property, by using the name of the key properties as its keys and the names of the key value matching properties of the [=source relation mapping=]'s source object as the corresponding values.

### `FilterMapping`

A <dfn>`FilterMapping` node</dfn> is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a [=filter mapping=].

It MUST have a `property` key with a string value property reference, that is the value of the name of the referenced property of the [=source relation mapping=]'s target object.

It MUST have an `operator` key whose value is a [=FilterOperator node=].

It MUST have a `sourcePath` key whose value is a [=Path node=] which expresses a value of the relation the [=source relation mapping=]'s source object.

### `FilterOperator`

A <dfn>`FilterOperator` node</dfn> is a  [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a [=filter operator=].

It MUST have a `type` key with a string value indicating the type of operator.

### `ObjectTypeMapping`

An <dfn>`ObjectTypeMapping` node</dfn> expresses an [=object type mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping) within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `objectTypeMappings` key. The key in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the `objectTypeName` of the [=object type mapping=]. The value in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) that represents the set of [=object type mapping sets=] of which each item is a[=ObjectTypeMappingSet node=]

<aside class="note">
Note that the `mappingSets` relation from the [=object type mapping=] is implicit.
</aside>

### `ObjectTypeMappingSet`

An <dfn>`ObjectTypeMappingSet` node</dfn> expresses an [=object type mapping set=].

An [=ObjectTypeMappingSet node=] MUST have a `sourceRoot` key, which represents the [=source root=] and whose value MUST be an [=ObjecttypeRef node=] as a shorthand for the [=SourceRoot node=].

An [=ObjectTypeMapping node=] MUST have zero or one `propertyMappings` key, whose value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing [=PropertyMapping nodes=].

<aside class="example" title="object type mapping with object type mapping sets">

```yaml
objectTypeMappings:

  Address:
    - sourceRoot: bag:Nummeraanduiding
      propertyMappings: ...
    
  Gebouw:
    - sourceRoot: bgt:Pand
      propertyMappings: ...
    - sourceRoot: bgt:OverigBouwwerk
      propertyMappings: ...
```
</aside>

### `SourceRoot`
A <dfn>`SourceRoot` node</dfn> represents a [=source root=]. It is represented by a [mapping node](https://yaml.org/spec/1.2.2/#mapping). The [mapping node](https://yaml.org/spec/1.2.2/#mapping) MUST have a key `type` whose value is an [=ObjectTypeRef node=].

### `ObjectTypeRef`
An <dfn>`ObjectTypeRef` node</dfn> represents an [=object type ref=]. It is a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar) with the following pattern `{modelAlias}:{objectTypeName}`, where `{modelAlias}` is the [=model alias=] of a [=source model=], and `{objectTypeName}` is the name of the [=object type=] in that source model.

### `PropertyMapping`

A <dfn>`PropertyMapping` node</dfn> expresses a [=property mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping) within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `propertyMappings` key. The key in the [key/value pair](https://yaml.org/spec/1.2.2/#mapping) is the `propertyName` of the [=Property Mapping=].

A [=PropertyMapping node=] MUST have one `pathMappings` or `pathMapping` key, whose value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence), representing [=PathMapping nodes=], or a [mapping node](https://yaml.org/spec/1.2.2/#mapping), representing a [=PathMapping node=] respectively.

The evaluation of the [=path mapping=]\(s) SHOULD yield a [=path mapping result=] that matches the type of the [=property=] in the target model which is referenced by `propertyName`.

A [=PropertyMapping node=] MUST have zero or one `combine` key, whose value is a [=ResultCombiner node=]. 

<aside class="example" title="property mapping">

```yaml
objectTypeMappings:
  Address:
    - sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        addressID:
          pathMappings:
            - path: identificatie
        postCode:
          pathMapping:
            path: postcode
```
</aside>

### `PathMapping`

A <dfn>`PathMapping` node</dfn> expresses a [=path mapping=]. It is represented by a [key/value pair](https://yaml.org/spec/1.2.2/#mapping), or a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar), within the [mapping node](https://yaml.org/spec/1.2.2/#mapping) that is the value of the `pathMappings` key.

A <dfn>key-value `PathMapping` node</dfn> MUST have one `paths` or `path` key, whose value is a [sequence node](https://yaml.org/spec/1.2.2/#sequence) representing [=path expressions=], or [mapping node](https://yaml.org/spec/1.2.2/#mapping) representing a [=path expression=] respectively.
 
A <dfn>string scalar `PathMapping` node</dfn> is a [=path expression=].

A [=key-value PathMapping node=] MUST have zero or one `ifMatchType` key, whose value is a [=ObjectTypeRef node=]. When specified, this [=path mapping=] is only evaluated if the source root in the current property mapping evaluation matches. 

A [=key-value PathMapping node=] MUST have zero or one `map` key, whose value is a either a sequence node of [=ResultMapper nodes=], or a single [=ResultMapper node=].

A [=key-value PathMapping node=] MUST have zero or one `andThen` key, whose value is either a sequence node of [=PathMapping nodes=], or a single [=PathMapping node=].

A [=key-value PathMapping node=] MUST have zero or one `ifMatch` key, whose value is a [=Matcher node=].

When a [=PathMapping node=] is the value of an `andThen` key, the `ifMatch` [=matcher=] is evaluated on the [=path mapping result=] of the `andThen` bearing [=path mapping=].

<aside class="example" title="path mapping">

```yaml
objectTypeMappings:
  Address:
    - sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        locatorDesignator:
          pathMappings:
            - path: huisnummer
            - path: huisnummertoevoeging
              map:
                type: prepend
                options:
                  prefix: ' '
            - path: huisletter
              map:
                type: prepend
                options:
                  prefix: ' '
          combine:
            type: join
        postName:
          pathMappings:
            path: ligtIn/naam
            andThen:
              ifMatch:
                type: isNull
              path: ligtAan/ligtIn/naam
```
</aside>

### `Path`

A <dfn>`Path` node</dfn> expresses a [=path=]. It is represented by a [mapping node](https://yaml.org/spec/1.2.2/#mapping), or a [=path expression=].

A property<dfn>`MappingNode`-`Path`</dfn> MUST have exactly one `expression` key, whose value is a [=Path expression node=].

A [=MappingNode-Path=] MUST have zero or one `combiner` key, whose value is a [=ResultCombiner node=].

A <dfn>`Path` expression node</dfn> is a [generic string](https://yaml.org/spec/1.2.2/#10113-generic-string) [scalar node](https://yaml.org/spec/1.2.2/#scalar) that expresses a [=path=]. [=Segments=] of the [=path=] are separated by a `/` character.

<aside class="issue">
Formal description of which characters are allowed in a [=Path expression node=].
</aside>

### `Component`

A <dfn>`Component` node</dfn> is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) which MUST have
* a key `type` which determines the type of the component.
* zero or one key `options`, whose value is a [mapping node](https://yaml.org/spec/1.2.2/#mapping) which defines the options for the component.

### `ResultCombiner`
c
A <dfn>`ResultCombiner` node</dfn> is a [=Component node=]. It represents a [=result combiner=].

### `ResultMapper`

A <dfn>`ResultMapper` node</dfn> is a [=Component node=]. It represents a [=result mapper=].
ggit
<aside class="example" title="Result mapper">

```yaml
objectTypeMappings:
  Address:
    - sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        isMainAddress:
          pathMapping:
            path: isHoofdadresVan/identificatie
            map: nonNull
```
</aside>

### `Matcher`

A <dfn>`Matcher` node</dfn> is a [=Component node=]. It represents a [=matcher=].
