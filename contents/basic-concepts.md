# Basic concepts

The IMX model mapping plays an important role in the reference architecture of the IMX orchestration process. The mapping serves as a translation from one or more source model based API data sources towards a target model based API data source.

The IMX model mapping is the core of what drives the orchestration process that will handle requests to the target API.

![IMX Orchestration](/media/orchestration.drawio.png "IMX Orchestration")

The default way of expressing a model mapping is in [[YAML]] format. In recent years, [[YAML]] has emerged as a concise, readable format to represent information, which is widely applied as a configuration file format.

<aside class="example" title="IMX Model Mapping in YAML">

  ```yaml
  objectTypeMappings:
    Address:
      sourceRoot: bag:Nummeraanduiding
      propertyMappings:
        addressID:
          pathMappings:
            path: identificatie
        locatorDesignator:
          pathMappings:
            - path: huisnummer
              transform: toString
            - path: huisnummertoevoeging
              combiner:
                name: concat
                prefix: ' '
            - path: huisletter
              combiner:
                name: concat
                prefix: ' '
        postCode:
          pathMapping:
            path: postcode
        postName:
          pathMapping:
            paths:
              - ligtIn/naam
              - ligtAan/ligtIn/naam
        thoroughfare:
          pathMapping:
            path: ligtAan/naam
  ```
</aside>
