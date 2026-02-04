import { Flashcard } from '../models/flashcard.model';

export const VUE_CARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════
  // CORE CONCEPTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'vue-1',
    question: 'What is Vue.js and what are its key features?',
    answer: 'Vue is a progressive JavaScript framework. Key features: reactive data binding, component-based, SFC (Single File Components), virtual DOM, easy learning curve. Can be incrementally adopted.',
    codeExample: `// Vue 3 Composition API
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

<style scoped>
button { padding: 10px; }
</style>`,
    technology: 'vue',
    category: 'Core',
    difficulty: 'easy',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-2',
    question: 'What is the difference between Options API and Composition API?',
    answer: 'Options API: organize by options (data, methods, computed). Composition API: organize by feature/logic, better TypeScript support, code reuse with composables. Vue 3 recommends Composition.',
    codeExample: `// OPTIONS API (Vue 2 style)
export default {
  data() {
    return { count: 0 };
  },
  computed: {
    doubled() { return this.count * 2; }
  },
  methods: {
    increment() { this.count++; }
  }
}

// COMPOSITION API (Vue 3)
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
const increment = () => count.value++;
</script>

// Benefits of Composition:
// - Better code organization by feature
// - Reusable logic via composables
// - Better TypeScript inference
// - Smaller bundle (tree-shakeable)`,
    technology: 'vue',
    category: 'Core',
    difficulty: 'medium',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // REACTIVITY
  // ═══════════════════════════════════════════════════════
  {
    id: 'vue-3',
    question: 'What is ref() vs reactive() in Vue 3?',
    answer: 'ref() wraps primitives, access with .value. reactive() wraps objects, access directly. ref() can hold any type. reactive() loses reactivity if destructured.',
    codeExample: `import { ref, reactive } from 'vue';

// ref() - for primitives (and objects too)
const count = ref(0);
count.value++; // Access with .value
// In template: {{ count }} (auto-unwrapped)

// reactive() - for objects only
const user = reactive({
  name: 'Alice',
  age: 30
});
user.name = 'Bob'; // Direct access

// ⚠️ reactive() loses reactivity on destructure
const { name } = user; // name is NOT reactive

// ✅ Use toRefs() to destructure
import { toRefs } from 'vue';
const { name, age } = toRefs(user); // Both reactive

// Best practice: use ref() for everything
// It's more consistent and flexible`,
    technology: 'vue',
    category: 'Reactivity',
    difficulty: 'medium',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-4',
    question: 'What is computed() in Vue?',
    answer: 'computed() creates derived reactive values. Cached - only recalculates when dependencies change. Use for expensive calculations or data transformations.',
    codeExample: `<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { name: 'Apple', price: 1.50 },
  { name: 'Banana', price: 0.75 }
]);

// Computed: cached, auto-updates
const total = computed(() => 
  items.value.reduce((sum, item) => sum + item.price, 0)
);

// Writable computed (getter + setter)
const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value;
  },
  set(value) {
    [firstName.value, lastName.value] = value.split(' ');
  }
});

fullName.value = 'John Doe'; // Triggers setter
</script>

<template>
  <p>Total: \${{ total.toFixed(2) }}</p>
</template>`,
    technology: 'vue',
    category: 'Reactivity',
    difficulty: 'easy',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-5',
    question: 'What is watch() vs watchEffect()?',
    answer: 'watch() explicitly declares dependencies, provides old/new values. watchEffect() auto-tracks dependencies, runs immediately. Use watch for specific reactions, watchEffect for side effects.',
    codeExample: `import { ref, watch, watchEffect } from 'vue';

const count = ref(0);
const name = ref('Alice');

// watch: explicit source, lazy by default
watch(count, (newVal, oldVal) => {
  console.log(\`Count: \${oldVal} → \${newVal}\`);
});

// Watch multiple sources
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Something changed');
});

// watchEffect: auto-track, runs immediately
watchEffect(() => {
  // Automatically tracks count.value and name.value
  console.log(\`Count is \${count.value}, Name is \${name.value}\`);
});

// Cleanup
watchEffect((onCleanup) => {
  const timer = setInterval(() => {}, 1000);
  onCleanup(() => clearInterval(timer));
});`,
    technology: 'vue',
    category: 'Reactivity',
    difficulty: 'medium',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // COMPONENTS
  // ═══════════════════════════════════════════════════════
  {
    id: 'vue-6',
    question: 'How do you pass props in Vue?',
    answer: 'Define props with defineProps(). Parent passes with v-bind or :. Props are read-only. Use with or without TypeScript types.',
    codeExample: `<!-- Child.vue -->
<script setup>
// JavaScript way
const props = defineProps(['title', 'count']);

// TypeScript way (recommended)
interface Props {
  title: string;
  count?: number; // optional
  items: string[];
}
const props = defineProps<Props>();

// With defaults
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  items: () => []
});
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<!-- Parent.vue -->
<template>
  <Child 
    title="Hello" 
    :count="5" 
    :items="['a', 'b']"
  />
</template>`,
    technology: 'vue',
    category: 'Components',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-7',
    question: 'How do you emit events from child to parent?',
    answer: 'Use defineEmits() to declare events. Call emit() to trigger. Parent listens with @eventName. Can include payload.',
    codeExample: `<!-- Child.vue -->
<script setup>
// JavaScript way
const emit = defineEmits(['update', 'delete']);

// TypeScript way
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'delete', id: number): void;
}>();

function handleClick() {
  emit('update', 'new value');
}
</script>

<template>
  <button @click="emit('delete', item.id)">Delete</button>
</template>

<!-- Parent.vue -->
<template>
  <Child 
    @update="handleUpdate" 
    @delete="handleDelete"
  />
</template>

<script setup>
function handleUpdate(value) {
  console.log('Updated:', value);
}
</script>`,
    technology: 'vue',
    category: 'Components',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-8',
    question: 'What is v-model and how do you create custom v-model?',
    answer: 'v-model is two-way binding syntax sugar for :modelValue + @update:modelValue. Create custom by emitting update:modelValue. Can have multiple v-models.',
    codeExample: `<!-- Native v-model -->
<input v-model="name" />
<!-- Equivalent to: -->
<input :value="name" @input="name = $event.target.value" />

<!-- Custom component with v-model -->
<!-- CustomInput.vue -->
<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input 
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<!-- Usage -->
<CustomInput v-model="username" />

<!-- Multiple v-models -->
<DatePicker 
  v-model:startDate="start"
  v-model:endDate="end"
/>`,
    technology: 'vue',
    category: 'Components',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // DIRECTIVES & TEMPLATES
  // ═══════════════════════════════════════════════════════
  {
    id: 'vue-9',
    question: 'What are the main Vue directives?',
    answer: 'v-if/v-else: conditional rendering. v-for: list rendering. v-bind (:): bind attributes. v-on (@): event handling. v-model: two-way binding. v-show: toggle visibility.',
    codeExample: `<template>
  <!-- v-if: conditional rendering (removes from DOM) -->
  <div v-if="isLoggedIn">Welcome!</div>
  <div v-else-if="isLoading">Loading...</div>
  <div v-else>Please log in</div>
  
  <!-- v-show: toggle CSS display (stays in DOM) -->
  <div v-show="isVisible">Toggle me</div>
  
  <!-- v-for: list rendering (key required!) -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- v-bind: dynamic attributes -->
  <img :src="imageUrl" :alt="imageAlt">
  
  <!-- v-on: event handling -->
  <button @click="handleClick">Click</button>
  <input @keyup.enter="submit">
  
  <!-- v-model: two-way binding -->
  <input v-model="name">
</template>`,
    technology: 'vue',
    category: 'Directives',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-10',
    question: 'What is the difference between v-if and v-show?',
    answer: 'v-if: actually removes/adds element from DOM. Higher toggle cost. v-show: toggles CSS display property. Higher initial render cost. Use v-show for frequent toggles.',
    codeExample: `<!-- v-if: Element removed from DOM when false -->
<div v-if="isVisible">
  <!-- This entire element is destroyed/recreated -->
  <!-- Lifecycle hooks run each time -->
</div>

<!-- v-show: CSS display: none when false -->
<div v-show="isVisible">
  <!-- Element always in DOM, just hidden -->
  <!-- Better for frequent toggles -->
</div>

<!-- When to use which? -->

<!-- v-if: -->
<!-- - Condition rarely changes -->
<!-- - Complex component (save memory) -->
<!-- - Need v-else -->

<!-- v-show: -->
<!-- - Frequent toggles (tabs, dropdowns) -->
<!-- - Simple elements -->
<!-- - Initial render doesn't matter -->`,
    technology: 'vue',
    category: 'Directives',
    difficulty: 'easy',
    timesCorrect: 0,
    timesIncorrect: 0
  },

  // ═══════════════════════════════════════════════════════
  // COMPOSABLES & ADVANCED
  // ═══════════════════════════════════════════════════════
  {
    id: 'vue-11',
    question: 'What are composables in Vue?',
    answer: 'Composables are functions that use Composition API to encapsulate reusable stateful logic. Named use*. Return reactive state and methods. Vue\'s answer to React hooks.',
    codeExample: `// composables/useMouse.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  
  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }
  
  onMounted(() => window.addEventListener('mousemove', update));
  onUnmounted(() => window.removeEventListener('mousemove', update));
  
  return { x, y };
}

// Usage in component
<script setup>
import { useMouse } from '@/composables/useMouse';

const { x, y } = useMouse();
</script>

<template>
  <p>Mouse: {{ x }}, {{ y }}</p>
</template>`,
    technology: 'vue',
    category: 'Composables',
    difficulty: 'medium',
    version: 'Vue 3',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-12',
    question: 'What is provide/inject in Vue?',
    answer: 'provide/inject enables dependency injection across component tree. Parent provides, any descendant injects. Avoids prop drilling. Use for themes, services, app-level state.',
    codeExample: `// Parent provides
<script setup>
import { provide, ref } from 'vue';

const theme = ref('dark');
const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
};

// Symbol key for type safety
const ThemeKey = Symbol('theme');

provide(ThemeKey, {
  theme,
  toggleTheme
});
</script>

// Any descendant injects
<script setup>
import { inject } from 'vue';

const { theme, toggleTheme } = inject(ThemeKey);
</script>

<template>
  <div :class="theme">
    <button @click="toggleTheme">Toggle</button>
  </div>
</template>`,
    technology: 'vue',
    category: 'Advanced',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-13',
    question: 'What are slots in Vue?',
    answer: 'Slots pass template content from parent to child. Default slot: unnamed content. Named slots: specific areas. Scoped slots: child passes data to parent template.',
    codeExample: `<!-- Card.vue - Child with slots -->
<template>
  <div class="card">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <main>
      <slot>Default content</slot>
    </main>
    <footer>
      <slot name="footer" :data="footerData"></slot>
    </footer>
  </div>
</template>

<!-- Parent using slots -->
<template>
  <Card>
    <template #header>
      <h1>My Title</h1>
    </template>
    
    <p>Main content goes in default slot</p>
    
    <!-- Scoped slot: access child data -->
    <template #footer="{ data }">
      <p>Footer with {{ data }}</p>
    </template>
  </Card>
</template>`,
    technology: 'vue',
    category: 'Components',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-14',
    question: 'How do you use Vue Router?',
    answer: 'Vue Router handles SPA navigation. Define routes mapping paths to components. Use <router-view> to render matched component. <router-link> for navigation. Access route via useRoute().',
    codeExample: `// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { 
    path: '/user/:id', 
    component: User,
    props: true  // Pass params as props
  },
  { 
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => {
      // Route guard
      if (!isAdmin) return '/login';
    }
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

// In component
<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();   // Current route info
const router = useRouter(); // Navigation methods

router.push('/about');
router.push({ name: 'user', params: { id: 123 } });
</script>`,
    technology: 'vue',
    category: 'Routing',
    difficulty: 'medium',
    timesCorrect: 0,
    timesIncorrect: 0
  },
  {
    id: 'vue-15',
    question: 'What is Pinia and how does it compare to Vuex?',
    answer: 'Pinia is the official state management for Vue 3 (replaced Vuex). Simpler API, great TypeScript support, no mutations, modular by default. Uses stores with state, getters, actions.',
    codeExample: `// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  // State
  state: () => ({
    count: 0,
    name: 'Counter'
  }),
  
  // Getters (computed)
  getters: {
    doubleCount: (state) => state.count * 2,
    // Access other getters
    message() {
      return \`\${this.name}: \${this.doubleCount}\`;
    }
  },
  
  // Actions (methods)
  actions: {
    increment() {
      this.count++;
    },
    async fetchData() {
      const data = await api.get('/data');
      this.count = data.count;
    }
  }
});

// Usage in component
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <button @click="counter.increment">
    {{ counter.count }} ({{ counter.doubleCount }})
  </button>
</template>`,
    technology: 'vue',
    category: 'State Management',
    difficulty: 'medium',
    version: 'Pinia 2+',
    timesCorrect: 0,
    timesIncorrect: 0
  }
];
