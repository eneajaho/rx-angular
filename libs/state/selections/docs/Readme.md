# Motivation

![Selections (1)](https://user-images.githubusercontent.com/10064416/152422745-b3d8e094-d0f0-4810-b1b2-5f81fae25938.png)

When managing state you want to maintain a core unit of data. 
This data is then later on distributed to multiple places in your component template (local) or whole app (global). 

We can forward this state to thier consumers directly or compute specific derivations (selections) for the core unit.

As an example we could think of the following shape: 

**A list and a list title**
```typescript
interface GlobalModel {
  title: string;
  list: { id: number, date: Date }
}
```

This data is consumed in different screens:

**A list of all items sorted by id**
```typescript
interface SeceltionScreen1 {
  title: string;
  sortDirection: 'asc' | 'desc' | 'none';
  list: { id: number }
}
```

**A list of items filtered by date**
```typescript
interface SeceltionScreen2 {
  title: string;
  startingDate: Date;
  list: { id: number }
}
```

The 2 rendered lists are a derivation, a modified version of the core set of items.
One time they are displayed in a sorted order, the other time only filtered subset of the items.

> **Hint:**  
> Derivations are always redundant information of our core data and therefore should not get stored,
> but cached in the derivation logic.

![Selections (2)](https://user-images.githubusercontent.com/10064416/152422803-bfd07ab2-0a6f-4521-836e-b71677e11923.png)



As this process contains a lot of gotchas and possible pitfalls in terms of memory usage and performance this small helper library was created.

# Benefits

<Solutions IMG>

- Sophisticated set of helpers for any selection problem
- Enables lazy rendering
- Computes only distinct values
- Shares computed result with multiple subscriber
- Select distinct sub-sets
- Select from static values
- Fully Tested
- Fully Typed

## Selection owner - Template vs Class

As Observables are cold their resulting srteam will only get active too by a subscription.
This leads to situations called the late or the early subscriber problem. (LINK)

![Selections (5)](https://user-images.githubusercontent.com/10064416/152422955-cb89d198-1a69-450b-be84-29dd6c8c4fdb.png)


In most cases it's best to go with solving problems on the early subscriber side and be sure we never loose values that should render on the screen.

![Selections (4)](https://user-images.githubusercontent.com/10064416/152422883-0b5f6006-7929-4520-b0b2-79eb61e4eb08.png)



## Advanced derivations architecture

<SELECT => CONNECT BAD IMG>

<SELECT GOOD IMG>