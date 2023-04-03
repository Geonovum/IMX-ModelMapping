# Representing models for orchestration

To make the IMX mapping and orchestration independent of underlying modeling standards and implementations, a simple internal logical data model representation is used, to which a source model must be mapped.

<aside class="note">
The mapping itself is left as an implementation detail.
</aside>

![Model representation for orchestration](/media/model.drawio.png "Model representation for orchestration")

## Model (`Model`)

A <dfn>model</dfn> is the representation of a logical data model which can be used in an <a>IMX orchestration engine</a>.

A logical data model is used to define <a>data elements</a> which which are used to describe <a>objects</a>.

A <dfn data-lt="data elements">data element</dfn> consists of a subject, a property and a value, which together represent an elementary statement about an object.

An <dfn data-lt="objects">object</dfn> is anything that is the subject of a <a>data element</a>.

_Overview attributes_

| Name | Cardinality | Definition             |
|------|-------------|------------------------|
| name | 1..1        | The name of the model. |

_Overview relations_

| Name              | Cardinality | Definition                                                              |
|-------------------|-------------|-------------------------------------------------------------------------|
| objectType        | 0..*        | A relation pointing to an <a>object type</a> that is part of the model. |

## Object type (`ObjectType`)

An <dfn>object type</dfn> represents the set of a type of <a>object</a>.

_Overview attributes_

| Name | Cardinality | Definition                   |
|------|-------------|------------------------------|
| name | 1..1        | The name of the object type. |

_Overview relations_

| Name              | Cardinality | Definition                                                                                          |
|-------------------|-------------|-----------------------------------------------------------------------------------------------------|
| property          | 0..*        | A relation pointing to a <a>property</a>.                                                           |
| identityProperty  | 0..*        | A relation pointing to a <a>property</a> which is identifying for the property-bearing object type. |

## Property (`Property`)

A <dfn>property</dfn> is a predicate which is used to express a <a>data element</a> about an <a>object</a>.

_Overview attributes_

| Name | Cardinality | Definition                |
|------|-------------|---------------------------|
| name | 1..1        | The name of the property. |

### Relation (`Relation`)

A <dfn>relation</dfn> is a <a>property</a> which expresses a relationship between the relation-bearing <a>object</a> and a target <a>object</a>. It is a <a>subtype</a> of <a>Property</a>.

_Overview relations_

| Name              | Cardinality | Definition                                                 |
|-------------------|-------------|------------------------------------------------------------|
| target            | 0..*        | The <a>object type</a> that is the target of the relation. |

### Attribute (`Attribute`)

An <dfn>attribute</dfn> is a <a>property</a> which expresses a characteristic about an <a>object</a>.

_Overview relations_

| Name              | Cardinality | Definition                                                                                                   |
|-------------------|-------------|--------------------------------------------------------------------------------------------------------------|
| type              | 1..1        | The <a>attribute type</a> that is the type of the value of the <a>data element</a> expressing the attribute. |

## Attribute type (`AttributeType`)

An <dfn>attribute type</dfn> is a type of an <a>attribute</a>-expressing <a>data element</a>.

_Overview attributes_

| Name | Cardinality | Definition                      |
|------|-------------|---------------------------------|
| name | 1..1        | The name of the attribute type. |

### Scalar type (`ScalarType`)

A <dfn>scalar type</dfn> is a <a>attribute type</a> which is a scalar.

Common examples of scalars are:
* String
* Integer
* Boolean
