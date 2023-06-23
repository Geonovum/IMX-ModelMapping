# Representing models for orchestration

To make the [=IMX mapping=] and orchestration independent of underlying modeling standards and implementations, a simple internal logical data model representation is used, to which a [=source model=] must be mapped.

<aside class="note">
The mapping to the IMX internal logical data model is left as an implementation detail.
</aside>

![Model representation for orchestration](media/model.drawio.png "Model representation for orchestration")

## Model (`Model`)

A <dfn>model</dfn> is the representation of a logical data model which can be used in an [=IMX orchestration engine=].

A logical data model is used to define [=data elements=] which which are used to describe [=objects=].

A <dfn>data element</dfn> consists of a subject, a property and a value, which together represent an elementary statement about an object.

An <dfn>object</dfn> is anything that is the subject of a [=data element=]. A contextually grouped set of [=data elements=] about the same object forms a <dfn>data object</dfn>.

_Overview attributes_

| Name | Multiplicity | Definition             |
|------|--------------|------------------------|
| name | 1..1         | The name of the model. |

_Overview relations_

| Name              | Multiplicity | Definition                                                           |
|-------------------|--------------|----------------------------------------------------------------------|
| objectType        | 0..*         | A relation pointing to an [=object type=] that is part of the model. |

## Object type (`ObjectType`)

An <dfn>object type</dfn> represents the set of a type of [=object=].

_Overview attributes_

| Name | Multiplicity | Definition                   |
|------|--------------|------------------------------|
| name | 1..1         | The name of the object type. |

_Overview relations_

| Name              | Multiplicity | Definition                                                                                       |
|-------------------|--------------|--------------------------------------------------------------------------------------------------|
| property          | 0..*         | A relation pointing to a [=property=].                                                           |
| identityProperty  | 0..*         | A relation pointing to a [=property=] which is identifying for the property-bearing object type. |

## Filter mapping (`FilterMapping`)

A <dfn>filter mapping</dfn> speficies how to filter source objects matching the target object. 

_Overview relations_

| Name       | Multiplicity | Definition                                                                                                      |
|------------|--------------|-----------------------------------------------------------------------------------------------------------------|
| property   | 0..*         | A relation pointing to a target object's [=property=].                                                          |
| operator   | 0..*         | A relation pointing to an [=operator=] which expresses a filter operation on the target object's [=property=] . |
| sourcePath | 0..*         | A relation pointing to a [=path=] on the objects of the source [=object type=].                                 |


## Filter Operator (`Filter Operator`)

A <dfn data-lt="operator">filter operator</dfn> specifies which operation is to be used to filter the matching source objects.

_Overview attributes_

| Name | Multiplicity | Definition          |
|------|--------------|---------------------|
| type | 0..*         | The operator type . |

## Property (`Property`)

A <dfn>property</dfn> is a predicate which is used to express a [=data element=] about an [=object=].

_Overview attributes_

| Name          | Multiplicity | Definition                                      |
|---------------|--------------|-------------------------------------------------|
| name          | 1..1         | The name of the property.                       |
| isIdentifier  | 1..1         | Indication whether the property is identifying. |
| multiplicity  | 1..1         | The [=multiplicity=] of the property.            |

### Multiplicity (`Multiplicity`)

A <dfn>multiplicity</dfn> is an enumeration item which is used to express how many times a [=data element=] with the same [=property=], and the same subject, can be expected to occur.

_Overview enumeration items_
| Name     | Definition                |
|----------|---------------------------|
| required | Occurs exactly once.      |
| optional | Can occur at most once.   |
| multi    | Can occur multiple times. |

### Relation (`Relation`)

A <dfn>relation</dfn> is a [=property=] which expresses a relationship between the relation-bearing [=object=] and a target [=object=]. It is a sub-type of [=Property=].

_Overview attributes_

| Name               | Multiplicity | Definition                                                                                                                    |
|--------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|
| inverseName        | 1..1         | The inverse name of the [=relation=], to be used to traverse the relation in the inverse direction.                           |
| inverseCardinality | 1..1         | The inverse cardinality of the [=relation=].                                                                                  |
| keyMapping         | 0..1         | A map (String -> Object) defining the mapping the source [=object type=] key [=properties=] to the target key [=properties=]. |

_Overview relations_

| Name          | Multiplicity | Definition                                                                         |
|---------------|--------------|------------------------------------------------------------------------------------|
| target        | 0..*         | The [=object type=] that is the target of the relation.                            |
| filterMapping | 0..*         | A relation pointing to a [=filter mapping=] to filter the matching source objects. |

### Attribute (`Attribute`)

An <dfn>attribute</dfn> is a [=property=] which expresses a characteristic about an [=object=].

_Overview relations_

| Name              | Multiplicity | Definition                                                                                          |
|-------------------|--------------|-----------------------------------------------------------------------------------------------------|
| type              | 1..1          | The [=value type=] that is the type of the value of the [=data element=] expressing the attribute. |

## Value type (`ValueType`)

A <dfn>value type</dfn> is a type of an [=attribute=]-expressing [=data element=].

_Overview attributes_

| Name | Multiplicity | Definition                  |
|------|--------------|-----------------------------|
| name | 1..1         | The name of the value type. |

### Scalar type (`ScalarType`)

A <dfn>scalar type</dfn> is a [=value type=] which is a scalar.

Common examples of scalars are:
* String
* Integer
* Boolean

### Geometry type (`GeometryType`)

A <dfn>geometry type</dfn> is a [=value type=] which represents a geometry.
