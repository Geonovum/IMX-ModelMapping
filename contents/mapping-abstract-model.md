# Mapping abstract model

![IMX Model Mapping](/media/imx-mapping-model.drawio.png "IMX Model Mapping")

## Source model (`SourceModel`)

A <dfn>source model</dfn> is a <a>model</a> which is used to define the structure of <a>data elements</a> in a <a>source data source</a> in an IMX orchestration process.

## Target model (`TargetModel`)

A <dfn>target model</dfn> is a <a>model</a> which is used to define the structure of <a>data elements</a> in the <a>target data source</a> in an IMX orchestration process.

## Model mapping (`ModelMapping`)

A <dfn>model mapping</dfn> is a set of declarations which afford the combination and translation of one ore more source data model based data sources to a target data model based data source.

_Overview relations_

| Name              | Cardinality | Definition                                            |
|-------------------|-------------|-------------------------------------------------------|
| sourceModel       | 1..*        | A relation pointing to a <a>source model</a>.         |
| targetModel       | 1..1        | A relation pointing to a <a>target model</a>.         |
| objectTypeMapping | 0..*        | A relation pointing to an <a>object type mapping</a>. |

## Object type mapping (`ObjectTypeMapping`)

An <dfn>object type mapping</dfn> is a set of declarations which express the mapping of one or more <a>source model</a> based <a>data elements</a> to a target-model-object-type-based <a>data object</a>.

_Overview attributes_

| Name              | Cardinality | Definition                                                                                              |
|-------------------|-------------|---------------------------------------------------------------------------------------------------------|
| objectTypeName    | 0..*        | The name of the <a>object type</a> in the target model which is the target of this object type mapping. |

_Overview relations_

| Name              | Cardinality | Definition                                            |
|-------------------|-------------|-------------------------------------------------------|
| sourceModel       | 1..*        | A relation pointing to a <a>source model</a>.         |
| targetModel       | 1..1        | A relation pointing to a <a>target model</a>.         |
| objectTypeMapping | 0..*        | A relation pointing to an <a>object type mapping</a>. |

## Property mapping (`PropertyMapping`)

A <dfn>property mapping</dfn> is a set of declarations which express the mapping of a target <a>object type</a> <a>property</a> within an <a>object type mapping</a>.

_Overview attributes_

| Name         | Cardinality | Definition                                                                                             |
|--------------|-------------|--------------------------------------------------------------------------------------------------------|
| propertyName | 0..*        | The name of the <a>property</a> in the target model which is the target of this property type mapping. |

_Overview relations_

| Name              | Cardinality | Definition                                                              |
|-------------------|-------------|-------------------------------------------------------------------------|
| pathMappings      | 0..*        | An ordered list of relations pointing to a <a>property path mapping</a>. |

## Property Path mapping (`PropertyPathMapping`)

A <dfn>property path mapping</dfn> is a set of declarations which express a reference to a <a>>data element</a> of an <a>information object</a> of a <a>source data source</a>.

_Overview relations_

| Name | Cardinality | Definition                                     |
|------|-------------|------------------------------------------------|
| path | 0..*        | A relation pointing to a <a>property path</a>. |

## Property path (`PropertyPath`)

A <dfn>property path</dfn> is ...

A <dfn data-lt="segments">segment</dfn> is ...

_Overview attributes_

| Name     | Cardinality | Definition                                                                                              |
|----------|-------------|---------------------------------------------------------------------------------------------------------|
| segments | 1..1        | An ordered list of <a>segment</a> strings .... |

## Combiner (`Combiner`)

A <dfn>combiner</dfn> is a function which takes

## Transform (`Transform`)

A <dfn>transform</dfn> is a function which takes
