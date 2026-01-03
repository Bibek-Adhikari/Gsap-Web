# 🚀 JavaScript and DOM Mastery Study Plan

This plan is divided into five critical areas to master fundamental and advanced JavaScript concepts for robust web development.

## 1️⃣ DOM Event Flow (VERY IMPORTANT)

### 🎯 Learn Properly
Master the complete event lifecycle within the Document Object Model (DOM).

* **Event Bubbling:** The default flow where an event propagates **up** through its ancestors to the `document`.
* **Event Capturing:** The inverse flow where an event propagates **down** from the `window`/`document` to the target element.
* `e.target` vs. `e.currentTarget`:
    * `e.target`: The actual element where the event originated.
    * `e.currentTarget`: The element the event listener was attached to.
* **Why Delegation Works:** It relies on **event bubbling** to catch events from many children on a single parent listener.

### ❓ You Should Be Able to Answer
* Why does clicking a button trigger a `ul` listener?

### 🛠️ Practice
* Todo App (using delegation).
* User List (adding/deleting users using delegation).
* Menu Dropdown using delegation.

---

## 2️⃣ `closest()` & DOM Traversal

Never guess DOM paths again. Use modern methods for efficient navigation.

### 🎯 Re-watch & Master
* `parentElement`
* `children`
* `nextElementSibling`/`previousElementSibling`
* `closest()`: Find the nearest ancestor that matches a selector.
* `querySelector` vs. `querySelectorAll`

### 🥅 Goal
You should never resort to complex, brittle selectors like `parent.parent.children[2]`.

### 🛠️ Practice
* Click button → modify correct card using `closest('.card')`.
* Nested elements → find correct parent.

---

## 3️⃣ Array Mutation vs. Non-Mutation

Know which methods modify the original array and which return a new array.

### 🎯 Re-watch & Understand

| Category | Method Examples | Effect |
| :--- | :--- | :--- |
| **Mutate** (In-Place) | `push()`, `pop()`, `splice()`, `sort()` | **Modifies** the original array. |
| **Non-Mutate** (New Array) | `map()`, `filter()`, `reduce()`, `slice()`, `...spread` | Returns a **brand new** array. |

### 🛠️ Practice
* Todo delete (`splice`).
* Todo filter (`filter`).
* Stats using `reduce`.

---

## 4️⃣ Objects & References (CRITICAL)

This is fundamental to avoiding bugs when working with state.

### 🎯 Learn Deeply
* **Primitive vs. Reference:** Understand the difference in how they are stored and copied.
* **Shallow Copy vs. Deep Copy:**
    * `Object.assign()`: Shallow copy.
    * Spread operator (`{...obj}`): Shallow copy.
* Understand when a deep clone is necessary.

### 🛠️ Practice
* Edit user without mutating original (use `{...obj}`).
* Clone object before making any changes.

---

## 5️⃣ Truthy / Falsy & Short-Circuiting

Master conditional logic and providing smart defaults in one line.

### 🎯 Now Master
* **Falsy Values:** `false`, `0`, `""`, `null`, `undefined`, `NaN`.
* `&&` (AND Operator): Returns the first falsy or the last truthy value.
* `||` (OR Operator): Returns the first truthy value.
* `??` (Nullish Coalescing): Only considers `null` and `undefined` as "missing."

### 🛠️ Practice
* Form validation using `&&`.
* Default values using `||` and `??`.
* Safe rendering (e.g., `user.profile?.name || "Guest"`).