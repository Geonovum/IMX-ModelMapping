# Introduction

This document describes a proposed standard for mapping logical source data models to a logical target data model, in the context of IMX.

The IMX model mapping standard plays an important role in the reference architecture of the IMX orchestration process. The mapping serves as a formal translation syntax from one or more source models based API data sources towards one a target model based API data source. This mapping is at the basis of the actual IMX orchestration process.

[Chapter 4: Model representation](#representing-models-for-orchestration) specifies the model to which a source model must be mapped to be able to be put into the IMX orchestration engine. Basically a model consists of objecttypes and properties. Filter mapping specify how source object are selected to match target objects according to defined filter operations/queries.

[Chapter 5: Mapping abstract model](#mapping-abstract-model) implements the model defined in chapter 4 into a model for mapping between a source - and a target model containing all the necessary mapping rules. Objecttype mappping, path mapping (navigating through a source model) and property mapping are the basic concepts. Operators as result combiner, result mapper and matcher allow for defining complex combinations of chained results.

[Chapter 6: YAML specification](#yaml-imx-model-mapping-specification) presents the YAML encoding of the abstract mapping model. This YAML IMX Mapping specification serves as a specification for YAML instance documents into the IMX Orchestration engine for actual operating on a set of source and target API's.

In [annex 1](#annex-1-mapping-specifications-in-excel) the mapping specifications of the IMX-Geo model are presented. These are presented in an excel spreadsheet and serve as input for the machine readable YAML formalisation presented in this document.

