import { expect } from 'chai';
import Collection from '../app/scripts/models/collection.js';

describe('collection', () => {

  function DummyItem(args) {
    this.foo = args.foo;
  }
  DummyItem.prototype.serialize = function () {
    return {foo: this.foo};
  };

  it('should initialize with list of items', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}]
    });
    expect(collection).to.have.property('items');
    expect(collection.items).to.have.length(2);
    collection.items.forEach((item) => {
      expect(item).to.be.an.instanceof(DummyItem);
    });
  });

  it('should serialize to a JSON object', () => {
    var serializedCollection = {items: [{foo: 'abc'}, {foo: 'xyz'}]};
    var collection = new Collection({
        SubCollectionItem: DummyItem,
        items: serializedCollection.items
    });
    expect(collection.serialize()).to.deep.equal(serializedCollection);
  });

  it('should get item by its index', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}]
    });
    expect(collection.get(0)).to.have.property('foo', 'abc');
    expect(collection.get(1)).to.have.property('foo', 'xyz');
  });

  it('should insert new item', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}]
    });
    collection.insert(1, {foo: 'def'});
    expect(collection.items).to.have.length(3);
    expect(collection.items[1]).to.have.property('foo', 'def');
    expect(collection.items[1]).to.be.an.instanceof(DummyItem);
  });

  it('should remove existing item', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'def'}]
    });
    collection.remove(1);
    expect(collection).to.have.length(2);
    expect(collection.items[0]).to.have.property('foo', 'abc');
    expect(collection.items[1]).to.have.property('foo', 'def');
  });

  it('should iterate over items', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'def'}]
    });
    var iteratedItems = [];
    collection.forEach((item) => {
      iteratedItems.push(item);
    });
    expect(iteratedItems).to.deep.equal(collection.items);
  });

  it('should filter items', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'bef'}, {foo: 'ghi'}]
    });
    var itemsWithoutB = collection.filter((item) => {
      return item.foo.indexOf('b') === -1;
    });
    expect(itemsWithoutB).to.have.length(2);
    expect(itemsWithoutB[0]).to.have.property('foo', 'xyz');
    expect(itemsWithoutB[1]).to.have.property('foo', 'ghi');
  });

  it('should map items', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'def'}]
    });
    var iteratedItems = collection.map((item) => {
      return item;
    });
    expect(iteratedItems).to.deep.equal(collection.items);
  });

  it('should get collection length', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'def'}]
    });
    expect(collection.length).to.equal(3);
  });

  it('should set collection length', () => {
    var collection = new Collection({
      SubCollectionItem: DummyItem,
      items: [{foo: 'abc'}, {foo: 'xyz'}, {foo: 'def'}]
    });
    collection.length = 0;
    expect(collection.length).to.equal(0);
    expect(collection.items.length).to.equal(0);
  });

});
