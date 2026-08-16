# Project Guidelines: Custom Reusable Components

This document outlines the custom reusable components available in this project and explains how to use them across different files.

---

## 1. Common Components (`src/components/common/`)

These are general UI components that can be used anywhere in your application.

### `DeleteModal`
A ready-to-use confirmation modal built on top of shadcn's Dialog, specifically styled for delete/destructive actions.

**Props:**
- `title` (string, optional): The modal title. Default: "Are you sure?"
- `description` (string, optional): The modal description text.
- `triggerButton` (ReactNode, optional): Custom button to trigger the modal. If omitted, a default trash icon button is rendered.
- `onConfirm` (function, **required**): Async or sync function that runs when the user clicks "Confirm".
- `isLoading` (boolean, optional): Disables buttons and shows a loading spinner inside the Confirm button if true.

**Example Usage:**
```tsx
import DeleteModal from "@/components/common/DeleteModal";

const MyComponent = () => {
  const handleDelete = async () => {
    // Perform delete API call here
  };

  return (
    <DeleteModal 
      title="Delete User?"
      description="This will permanently delete the user."
      onConfirm={handleDelete}
      isLoading={false}
    />
  );
};
```

### `Spinner`
A flexible loading spinner component.

**Props:**
- `fullScreen` (boolean, optional): If true, renders an overlay covering the entire screen.
- `size` ("sm" | "md" | "lg", optional): Controls the size of the spinner. Default is "md".
- `className` (string, optional): Additional Tailwind classes.

**Example Usage:**
```tsx
import Spinner from "@/components/common/Spinner";

// Inline small spinner
<Spinner size="sm" />

// Full screen loading overlay
<Spinner fullScreen />
```

### `Pagination`
A controlled pagination component.

**Props:**
- `currentPage` (number, **required**): The active page number.
- `totalItem` (number, **required**): The total number of items across all pages.
- `limit` (number, **required**): Items per page.
- `onPageChange` (function, **required**): Callback fired when a page or next/prev is clicked.
- `className` (string, optional): Additional Tailwind classes.

**Example Usage:**
```tsx
import Pagination from "@/components/common/Pagination";
import { useState } from "react";

const MyList = () => {
  const [page, setPage] = useState(1);

  return (
    <Pagination 
      currentPage={page}
      totalItem={100}
      limit={10}
      onPageChange={(newPage) => setPage(newPage)}
    />
  );
};
```

---

## 2. Form Components (`src/components/form/`)

This project uses `react-hook-form` heavily. All input components are connected to it under the hood via `useFormContext`. **Because of this, every custom form input must be wrapped inside the `<MyFormWrapper>` component.**

### `MyFormWrapper`
The main context provider and `form` element wrapper. It initializes `react-hook-form`.

**Props:**
- `onSubmit` (function, **required**): Callback containing the submitted form data.
- `defaultValues` (object, optional): Initial values for the form fields.
- `resolver` (function, optional): Validation resolver (e.g., zodResolver).
- `setFormState` (function, optional): A callback to extract live form values on every change.
- `children` (ReactNode, **required**): The form inputs.

**Example Usage:**
```tsx
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInputText from "@/components/form/MyFormInputText";

const MyForm = () => {
  const handleSubmit = (data) => {
    console.log(data); // { email: "...", password: "..." }
  };

  return (
    <MyFormWrapper 
      onSubmit={handleSubmit}
      defaultValues={{ email: "" }}
    >
      <MyFormInputText name="email" label="Email Address" required />
      <button type="submit">Submit</button>
    </MyFormWrapper>
  );
};
```

### Form Inputs (e.g., `MyFormInputText`, `MyFormCheckbox`, `MyFormSelect`, etc.)
These components automatically hook into the closest `MyFormWrapper`. You just need to provide the `name` prop matching your data schema.

**Common Props across form components:**
- `name` (string, **required**): The key for the field in the form data.
- `label` (string, optional): Renders a label above the input.
- `required` (boolean, optional): Adds a built-in "required" rule and an asterisk to the label.
- `onValueChange` (function, optional): Callback for when the input changes (useful if you need to perform side-effects).
- `placeholder` (string, optional): Placeholder text.
- `disabled` (boolean, optional): Disables the input.
- `className`, `labelClassName`, `inputClassName` (string, optional): Styling overrides.

**Example of combining multiple inputs:**
```tsx
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInputText from "@/components/form/MyFormInputText";
import MyFormInputPassword from "@/components/form/MyFormInputPassword";
import MyFormCheckbox from "@/components/form/MyFormCheckbox";

const UserForm = () => {
  const onSubmit = (data) => console.log(data);

  return (
    <MyFormWrapper onSubmit={onSubmit}>
      <MyFormInputText 
        name="username" 
        label="Username" 
        placeholder="Enter username" 
        required 
      />
      <MyFormInputPassword 
        name="password" 
        label="Password" 
        required 
      />
      <MyFormCheckbox 
        name="terms" 
        label="I agree to terms" 
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </MyFormWrapper>
  );
};
```
