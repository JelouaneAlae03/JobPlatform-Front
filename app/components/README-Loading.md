# Loading Components and Hooks

This document explains how to use the loading components and hooks in the JobPlatform application.

## Components

### 1. LoadingSpinner

A reusable spinner component with customizable size, color, and text.

```tsx
import LoadingSpinner from './LoadingSpinner';

// Basic usage
<LoadingSpinner />

// With custom props
<LoadingSpinner 
    size="lg" 
    color="blue" 
    text="Loading jobs..." 
    fullScreen={true}
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `color`: 'blue' | 'white' | 'gray' (default: 'blue')
- `text`: string (default: 'Loading...')
- `fullScreen`: boolean (default: false) - Shows overlay spinner
- `className`: string - Additional CSS classes

### 2. LoadingButton

A button component that shows a spinner when loading.

```tsx
import LoadingButton from './LoadingButton';

<LoadingButton
    loading={isLoading}
    onClick={handleSave}
    variant="primary"
    size="md"
    loadingText="Saving..."
>
    Save Job
</LoadingButton>
```

**Props:**
- `loading`: boolean - Shows spinner when true
- `disabled`: boolean - Disables the button
- `onClick`: function - Click handler
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loadingText`: string - Text to show when loading
- `className`: string - Additional CSS classes

## Hooks

### useLoading

A custom hook for managing loading states.

```tsx
import { useLoading } from '~/hooks/useLoading';

const { isLoading, startLoading, stopLoading, withLoading } = useLoading(false);
```

**Returns:**
- `isLoading`: boolean - Current loading state
- `startLoading`: function - Set loading to true
- `stopLoading`: function - Set loading to false
- `withLoading`: function - Wrapper for async functions

**Usage Examples:**

```tsx
// Manual control
const { isLoading, startLoading, stopLoading } = useLoading();

const handleSubmit = async () => {
    startLoading();
    try {
        await apiCall();
    } finally {
        stopLoading();
    }
};

// Automatic control with withLoading
const { isLoading, withLoading } = useLoading();

const handleSubmit = async () => {
    await withLoading(async () => {
        await apiCall();
    });
};
```

## Implementation Examples

### Page Loading (JobListings, SavedJobs, etc.)

```tsx
import LoadingSpinner from './LoadingSpinner';
import { useLoading } from '~/hooks/useLoading';

export default function MyComponent() {
    const { isLoading, withLoading } = useLoading(true);

    const fetchData = async () => {
        await withLoading(async () => {
            // Your API call here
            const response = await axios.get('/api/data');
            setData(response.data);
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="lg" text="Loading data..." />
            </div>
        );
    }

    return (
        // Your component content
    );
}
```

### Individual Button Actions

```tsx
import LoadingButton from './LoadingButton';

export default function MyComponent() {
    const [savingItems, setSavingItems] = useState<Set<number>>(new Set());

    const handleSave = async (itemId: number) => {
        setSavingItems(prev => new Set(prev).add(itemId));
        
        try {
            await saveItem(itemId);
        } finally {
            setSavingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    return (
        <LoadingButton
            loading={savingItems.has(itemId)}
            onClick={() => handleSave(itemId)}
            loadingText="Saving..."
        >
            Save
        </LoadingButton>
    );
}
```

### Form Submission

```tsx
import LoadingButton from './LoadingButton';
import { useLoading } from '~/hooks/useLoading';

export default function MyForm() {
    const { isLoading, withLoading } = useLoading();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await withLoading(async () => {
            await submitForm();
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <LoadingButton
                type="submit"
                loading={isLoading}
                loadingText="Submitting..."
            >
                Submit
            </LoadingButton>
        </form>
    );
}
```

## Best Practices

1. **Use `withLoading` for automatic loading management** - It ensures loading state is properly reset even if errors occur.

2. **Use individual loading states for buttons** - This allows users to interact with other parts of the page while one action is loading.

3. **Provide meaningful loading text** - Help users understand what's happening.

4. **Use appropriate spinner sizes** - 'lg' for page loading, 'md' for sections, 'sm' for buttons.

5. **Handle errors gracefully** - Always use try-catch blocks and show appropriate error messages.

## Migration Guide

To update existing components:

1. Replace manual `setIsLoading(true/false)` with `withLoading()`
2. Replace basic loading divs with `<LoadingSpinner>`
3. Replace loading buttons with `<LoadingButton>`
4. Remove manual loading state management where possible 