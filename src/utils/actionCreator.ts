/**
 * Declaring a type with Generic Type T and payload P
 * This T value should be one of those Action types defined which is very specific string.
 */
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

/**
 * This will be action without payload. We are passing generic type T without payload.
 * We are creating without payload because optional payload will be pointed to "undefined". but still exists.
 * you want to be very explicit with and without payload.
 */
export type Action<T> = {
  type: T;
};

// we should be returning proper action Type based on the payload presence
// for this function overloading has to be defined : same number of params but of different types
/**
 * TS overloading implementation to return Action with payload
 * @param type
 * @param payload
 */
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

/**
 * Here we are passing no payload and hence overloading is done a
 * payload is indicated to be void to show that no payload is passed.
 * @param type
 * @param payload
 */
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;
/**
 * For defining this, we update the definition of the function from => to normal function.
 * This T is going to have the Enum value hence that will be fixed set of strings
 * and it's type will be string. This is the actual definition of the function
 */
export function createAction<T extends string, P>(type: T, payload: P) {
  return {
    type,
    payload,
  };
}

// export const createAction = (type, payload) => ({ type, payload });

// /**
//  * Intersection Types & return types
//  */
// type Human = { name: string };
// type Alien = { fly: () => void };

// // Intersection is & keyword, it's the type literal, this intersection will have the property of all the types
// // it has, ! Merging to types together.
// // todo when you want the object to (must) have the property from all the types
// type Hybrid = Human & Alien;
// /**
//  * if josh is just Human then only name will be there.
//  * if josh is just Alien then only fly will be there.
//  */
// const josh: Hybrid = {
//   fly: () => {},
//   name: "jsoh",
// };

// type dillow = Human | Alien;
// /**
//  * posh is not mandatory to have both fly and name while josh is requireed to have,
//  */
// const posh: dillow = {
//   fly: () => {},
//   // name: "sdfsdfsdf",
// };

// /**
//  * todo Return type : defining type based on the return type of the function.
//  * so TS will get the return type from myfunc and use that in the returnType here.
//  * todo we will be using both returnType and intersection type to create our matchable type.
//  */
// type Myfunc = () => number;
// type MyReturnType = ReturnType<Myfunc>
