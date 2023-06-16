# Mapping abstract model

![IMX Model Mapping](media/imx-mapping-model.drawio.png "IMX Model Mapping")

## Source model (`SourceModel`)

A <dfn>source model</dfn> is a [=model=] which is used to define the structure of [=data elements=] in a [=source data source=] in an [=IMX orchestration process=].

## Target model (`TargetModel`)

A <dfn>target model</dfn> is a [=model=] which is used to define the structure of [=data elements=] in the [=target data source=] in an [=IMX orchestration process=].

## Model mapping (`ModelMapping`)

A <dfn data-lt="IMX model mapping|IMX mapping">model mapping</dfn> is a set of declarations which afford the combination and translation of one ore more source data model based data sources to a target data model based data source.

_Overview relations_

| Name              | Multiplicity | Definition                                                |
|-------------------|--------------|-----------------------------------------------------------|
| objectTypeMapping | 1..*         | A relation pointing to an [=object type mapping=].        |
| pathMapping       | 0..*         | A relation pointing to a reusable named [=path mapping=]. |

## Object type ref (`ObjectTypeRef`)

An <dfn>object type ref</dfn> represents a reference to an [=object type=]. A reference is expressed using a [=model alias=] and the name of an [=object type=].

A <dfn data-lt="alias">model alias</dfn> is a string of characters that uniquely identifies a model in an [=IMX orchestration process=].

_Overview attributes_

| Name           | Multiplicity | Definition                           |
|----------------|--------------|--------------------------------------|
| modelAlias     | 1..1         | The [=alias=] of a [=source model=]. |
| objectTypeName | 1..1         | The name of the [=object type=].     |

## Source root (`SourceRoot`)

A <dfn>source root</dfn> is a set of declarations which express the starting point for [=path=] evaluations.

_Overview relations_

| Name        | Multiplicity | Definition                                    |
|-------------|--------------|-----------------------------------------------|
| type        | 1..1         | A relation pointing to a [=object type ref=]. |

## Object type mapping (`ObjectTypeMapping`)

An <dfn>object type mapping</dfn> is a set of declarations which express the mapping of one or more [=source model=] based [=data elements=] to a target-model-object-type-based [=data object=].

_Overview attributes_

| Name              | Multiplicity | Definition                                                                                           |
|-------------------|--------------|------------------------------------------------------------------------------------------------------|
| objectTypeName    | 0..*         | The name of the [=object type=] in the target model which is the target of this object type mapping. |

_Overview relations_

| Name            | Multiplicity | Definition                                     |
|-----------------|--------------|------------------------------------------------|
| sourceModel     | 1..*         | A relation pointing to a [=source model=].     |
| targetModel     | 1..1         | A relation pointing to a [=target model=].     |
| sourceRoot      | 1..1         | A relation pointing to a [=object type ref=].  |
| propertyMapping | 0..*         | A relation pointing to a [=property mapping=]. |

## Property mapping (`PropertyMapping`)

A <dfn>property mapping</dfn> is a set of declarations which express the mapping of a target [=object type=] [=property=] within an [=object type mapping=].

_Overview attributes_

| Name         | Multiplicity | Definition                                                                                          |
|--------------|--------------|-----------------------------------------------------------------------------------------------------|
| propertyName | 0..*         | The name of the [=property=] in the target model which is the target of this property type mapping. |

_Overview relations_

| Name        | Multiplicity | Definition                                                                       |
|-------------|--------------|----------------------------------------------------------------------------------|
| pathMapping | 0..*         | A relation that results in an ordered, non-unique sequence of [=path mappings=]. |
| combiner    | 0..1         | A relation pointing to a [=result combiner=].                                    |

## Path mapping (`PathMapping`)

A <dfn>path mapping</dfn> is a set of declarations which express references to [=data elements=] of [=data objects=] of [=source data sources=] and actions on those..

A <dfn>path mapping evaluation</dfn> is the evaluation of a [=path mapping=] yielding input for the [=property mapping=].

_Overview attributes_

| Name | Multiplicity | Definition                        |
|------|--------------|-----------------------------------|
| name | 0..*         | The name of the [=path mapping=]. |

_Overview relations_

| Name         | Multiplicity | Definition                                                                                                                        |
|--------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| path         | 1..1         | A relation that points to a [=path=].                                                                                             |
| next         | 0..*         | A relation that results in an ordered, non-unique sequence of [=path mappings=] that are to be evaluated after this path mapping. |
| resultMapper | 0..*         | A relation that results in an ordered, non-unique sequence of [=result mappers=].                                                 |
| ifMatch      | 0..1         | A relation that points to a [=matcher=].                                                                                          |
| ifMatchType  | 0..1         | A relation that points to a [=object type ref=].                                                                                  |
| repeat       | 0..1         | A relation that points to a [=path repeat=].                                                                                      |

## Path (`Path`)

A <dfn>path</dfn> is a set of declarations which, conceptually, represent a possible route through a graph of data elements. A [=path=] is comprised of an ordered, non-unique sequence of [=segments=]. Each segment represents a step in that route.

A <dfn>segment</dfn> is a string that represents a [=property reference=].

A <dfn>property reference</dfn> is a string that matches the name of a [=property=] in a [=data element=] in a [=source data source=].

_Overview attributes_

| Name    | Multiplicity | Definition                                              |
|---------|--------------|---------------------------------------------------------|
| segment | 1..*         | An ordered, non-unique sequence of [=segment=] strings. |

## Path repeat (`PathRepeat`)
A <dfn>path repeat</dfn> is a set of declarations which describe how the [=path mapping evaluation=] should be repeated.

_Overview relations_

| Name         | Multiplicity | Definition                                                                             |
|--------------|--------------|----------------------------------------------------------------------------------------|
| untilMatch   | 1..1         | A relation that points to a [=matcher=], which, when it matches, stops the repetition. |

## Component (`Component`)
A <dfn>component</dfn> is an abstract class of things that can process the result of one or more [=path mapping evaluations=] and produce a new result.

_Overview attributes_

| Name    | Multiplicity | Definition                                                                        |
|---------|--------------|-----------------------------------------------------------------------------------|
| type    | 1..1         | The type of the component.                                                        |
| options | 0..1         | A map (String -> Object) of options that the component can use to create results. |

### Result combiner (`ResultCombiner`)

A <dfn>result combiner</dfn> is a [=component=] which takes as input the result of a previous element in a sequence and combines it with the current element in the sequence.


### Result mapper (`ResultMapper`)

A <dfn>result mapper</dfn> is a [=component=] which takes the result of a [=path mapping evaluation=] and maps it to a new result.

### Matcher (`ResultMatcher`)

A <dfn>matcher</dfn> is a [=component=] which takes the result of a [=path mapping evaluation=] and returns true when it matches the result and false when it does not.
