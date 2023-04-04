# Mapping abstract model

![IMX Model Mapping](media/imx-mapping-model.drawio.png "IMX Model Mapping")

## Source model (`SourceModel`)

A <dfn>source model</dfn> is a [=model=] which is used to define the structure of [=data elements=] in a [=source data source=] in an IMX orchestration process.

## Target model (`TargetModel`)

A <dfn>target model</dfn> is a [=model=] which is used to define the structure of [=data elements=] in the [=target data source=] in an IMX orchestration process.

## Model mapping (`ModelMapping`)

A <dfn>model mapping</dfn> is a set of declarations which afford the combination and translation of one ore more source data model based data sources to a target data model based data source.

_Overview relations_

| Name              | Cardinality | Definition                                         |
|-------------------|-------------|----------------------------------------------------|
| sourceModel       | 1..*        | A relation pointing to a [=source model=].         |
| targetModel       | 1..1        | A relation pointing to a [=target model=].         |
| objectTypeMapping | 0..*        | A relation pointing to an [=object type mapping=]. |

## Object type mapping (`ObjectTypeMapping`)

An <dfn>object type mapping</dfn> is a set of declarations which express the mapping of one or more [=source model=] based [=data elements=] to a target-model-object-type-based [=data object=].

_Overview attributes_

| Name              | Cardinality | Definition                                                                                           |
|-------------------|-------------|------------------------------------------------------------------------------------------------------|
| objectTypeName    | 0..*        | The name of the [=object type=] in the target model which is the target of this object type mapping. |

_Overview relations_

| Name              | Cardinality | Definition                                         |
|-------------------|-------------|----------------------------------------------------|
| sourceModel       | 1..*        | A relation pointing to a [=source model=].         |
| targetModel       | 1..1        | A relation pointing to a [=target model=].         |
| objectTypeMapping | 0..*        | A relation pointing to an [=object type mapping=]. |

## Property mapping (`PropertyMapping`)

A <dfn>property mapping</dfn> is a set of declarations which express the mapping of a target [=object type=] [=property=] within an [=object type mapping=].

_Overview attributes_

| Name         | Cardinality | Definition                                                                                          |
|--------------|-------------|-----------------------------------------------------------------------------------------------------|
| propertyName | 0..*        | The name of the [=property=] in the target model which is the target of this property type mapping. |

_Overview relations_

| Name        | Cardinality | Definition                                                                               |
|-------------|-------------|------------------------------------------------------------------------------------------|
| pathMapping | 0..*        | A relation that results in an ordered, nonunique sequence of [=property path mappings=]. |

## Property Path mapping (`PropertyPathMapping`)

A <dfn data-lt="property path mappings">property path mapping</dfn> is a set of declarations which express a reference to a [=data element=] of an [=information object=] of a [=source data source=].

_Overview relations_

| Name      | Cardinality | Definition                                                                       |
|-----------|-------------|----------------------------------------------------------------------------------|
| path      | 0..*        | A relation that results in an ordered, nonunique sequence of [=property paths=]. |
| combiner  | 0..1        | A relation pointing to a [=combiner=].                                           |
| transform | 0..*        | A relation that results in an ordered, nonunique sequence of [=transforms=].     |

## Property path (`PropertyPath`)

A <dfn data-lt="property paths">property path</dfn> is a set of declarations which, conceptually, represent a possible route through a graph of data elements. A [=property path=] is comprised of an ordered, nonunique sequence of [=segments=]. Each segment represents a step in that route.

A <dfn data-lt="segments">segment</dfn> is a string that represents a [=property reference=].

A <dfn>property reference</dfn> is a string that matches the name of a [=property=] in a [=data element=] in a [=source data source=].

_Overview attributes_

| Name     | Cardinality | Definition                                            |
|----------|-------------|-------------------------------------------------------|
| segments | 1..*        | An ordered, nonunique sequence of [=segment=] strings |

_Overview relations_

| Name      | Cardinality | Definition                                                                       |
|-----------|-------------|----------------------------------------------------------------------------------|
| combiner  | 0..1        | A relation pointing to a [=combiner=].                                           |

## Combiner (`Combiner`)

A <dfn>combiner</dfn> is a function which takes as input the result of a previous element in a sequence and combines it with the current element in the sequence.

_Overview attributes_

| Name | Cardinality | Definition                |
|------|-------------|---------------------------|
| name | 1..1        | The name of the combiner. |


## Transform (`Transform`)

A <dfn data-lt="transforms">transform</dfn> is a function which takes the result of a [=property path mapping evaluation=] and transforms it to a new result.

_Overview attributes_

| Name | Cardinality | Definition                |
|------|-------------|---------------------------|
| name | 1..1        | The name of the combiner. |