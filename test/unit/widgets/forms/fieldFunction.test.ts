import { namedNode } from 'rdflib'
import ns from '../../../../src/ns'
import uiStore from '../../../../src/store'

import {
  field,
  fieldFunction,
  mostSpecificClassURI
} from '../../../../src/widgets/forms/fieldFunction'

describe('mostSpecificClassURI', () => {
  it('exists', () => {
    expect(mostSpecificClassURI).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const form = namedNode('http://example.com/#form')
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))
    expect(mostSpecificClassURI(form)).toEqual('http://example.com/#type')
  })
})

describe('fieldFunction', () => {
  it('exists', () => {
    expect(fieldFunction).toBeInstanceOf(Object)
  })
  it('returns the field function if it exists', () => {
    // create a function for type http://example.com/#type
    const myFunction = () => document.createElement('div')
    field['http://example.com/#type'] = myFunction

    // create a field of type http://example.com/#type
    const form = namedNode('http://example.com/#field')
    uiStore.add(form, ns.rdf('type'), namedNode('http://example.com/#type'), namedNode('http://example.com/'))

    expect(fieldFunction(document, namedNode('http://example.com/#field'))).toEqual(myFunction)
  })

  it('returns an error block if no matching function exists', () => {
    const fn = fieldFunction(document, namedNode('http://example.com/#doesnt-exist'))
    const container = document.createElement('div')
    fn(document, container, {},
      namedNode('http://example.com/#subject'),
      namedNode('http://example.com/#form'),
      namedNode('http://example.com/'),
      () => {})
    expect(container).toMatchSnapshot()
  })
})
