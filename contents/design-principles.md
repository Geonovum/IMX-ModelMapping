# Design Principles

**The mapping is implementation independent**

An important design principle is that the mapping should be independent of technical implementations, data format, or data modeling standards. This allows for broad use of the mapping across disparate data sources and environments.

**The mapping is declarative**

The mapping should be declarative. By declarative we mean that the mapping is described in a high level abstract language, describing the intent of the mapping, without explicit procedural logic. This affords various different usage scenario's, like employing different procedural strategies during the execution of the mapping, while keeping the mapping simple to express.

**The mapping is expressed in terms of logical models**

In order to be independent of technical data models and corresponding data formats, the mapping should be expressed at the logical level. A logical data model establishes the structure of [data items](https://geonovum.github.io/IMX-Metadata/#dfn-data-item), and their relationships, yet is independent of their technical implementation. This contributes to the mappings implementation independence.

<aside class="note">
Note that the logical model should be expressive enough to cover all its technical implementations. That is, it should be possible to translate expressions about data at the logical level, to the implementing technical level.
</aside>

**The mapping is independent of data modeling standards**

Their exist a variety of different data modeling standards, all with their own intricacies in the way they define [data items](https://geonovum.github.io/IMX-Metadata/#dfn-data-item). The mapping should be independent of these. This will allow for broad applicability of the mapping.
