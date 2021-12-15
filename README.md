# TS Config Manager

A manager for configuration for your application written on TypeScript.

## Como utilizar

```ts
import { factory } from 'config-manager-ts';

/**
 *  Assuming that configuration is loaded with these params:
 *  {
 *    firstKey: 'first key value',
 *    secondKey: {
 *      innerKey: 'inner key value',
 *      anotherKey: {
 *        anotherInnerKey: 'another key value'
 *      }
 *    }
 *  }
 **/

const configManager = factory();

configManager.get('firstKey');
// 'first key value'

configManager.all();
// { firstKey: ..., secondKey: ... } // full config object
```

## Inicializacao

### Instanciando via Factory

```sh
# define type to load configuration (json, env)
TS_CONFIG_MANAGER_LIST_TYPE
# define path and filename to load file, for JSON Type
TS_CONFIG_MANAGER_LIST_FILE
# define json stringified in environment variable to load
TS_CONFIG_MANAGER_LIST_DATA
```

### Configuracao com arquivo JSON

```js
// ${project-root}/config-manager-ts.json
{
  firstKey: 'first key value',
  secondKey: {
    innerKey: 'inner key value',
    anotherKey: {
      anotherInnerKey: 'another key value'
    }
  }
}
```

```sh
TS_CONFIG_MANAGER_LIST_TYPE = 'json'
```

If you prefer use another filename or path, you can defined it setting the environment variable:

```sh
TS_CONFIG_MANAGER_LIST_FILE = './path-to-config/custom-config-file.json'
```


### Configuracao com Variaveis de Ambiente

```sh
TS_CONFIG_MANAGER_LIST_TYPE = 'env'
TS_CONFIG_MANAGER_LIST_DATA = '{ "firstKey": "first env value", "secondKey": { "innerKey": "inner env value", "anotherKey": { "anotherInnerKey": "another env value" } } }';
```

### Instanciando via Middleware


### Configuracao com SSM

### Colocando o Configuration no Container de Injecao de Dependencia

## Configuracao