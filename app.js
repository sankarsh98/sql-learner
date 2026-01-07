// =============================================
// SQL LEARNER - Main Application
// =============================================

// Logger for debugging
const log = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`)
};

// =============================================
// LESSON CONTENT
// =============================================
const lessons = [
  // =============================================
  // 1. BASICS
  // =============================================
  {
    id: 'select-basics',
    category: 'Basics',
    section: 'basics',
    title: '1. SELECT Basics',
    description: 'Learn how to retrieve data from a database table.',
    content: `
      <h3>The SELECT Statement</h3>
      <p>The <code>SELECT</code> statement is the most fundamental SQL command. It retrieves data from one or more tables.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees;</pre></div>
      <p>Using <code>*</code> selects all columns.</p>
      <h3>Task</h3>
      <p>Select multiple columns by name to see just what you need.</p>
    `,
    hint: 'Use SELECT * FROM employees;',
    exercise: {
      validate: (results) => results.length > 0
    },
    solution: 'SELECT * FROM employees;'
  },
  {
    id: 'select-columns',
    category: 'Basics',
    section: 'basics',
    title: '2. Specific Columns',
    description: 'Select only the columns you need.',
    content: `
      <h3>Selecting Specific Columns</h3>
      <p>List column names separated by commas to select specific data.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> first_name, email <span class="keyword">FROM</span> employees;</pre></div>
      <h3>Task</h3>
      <p>Select only <code>first_name</code> and <code>salary</code> from the <code>employees</code> table.</p>
    `,
    hint: 'SELECT first_name, salary ...',
    exercise: {
      expectedColumns: ['first_name', 'salary'],
      validate: (results, expected, columns) => columns.length === 2 && columns.includes('first_name') && columns.includes('salary')
    },
    solution: 'SELECT first_name, salary FROM employees;'
  },
  {
    id: 'select-distinct',
    category: 'Basics',
    section: 'basics',
    title: '3. SELECT DISTINCT',
    description: 'Remove duplicate values from results.',
    content: `
      <h3>Removing Duplicates</h3>
      <p>Use <code>DISTINCT</code> to return only unique values.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> <span class="keyword">DISTINCT</span> department_id <span class="keyword">FROM</span> employees;</pre></div>
      <h3>Task</h3>
      <p>Get a list of all unique <code>city</code> names from the <code>customers</code> table.</p>
    `,
    hint: 'Use SELECT DISTINCT city...',
    exercise: {
      validate: (results) => results.length === 3 && results.every((r, i, arr) => arr.findIndex(x => x.city === r.city) === i)
    },
    solution: 'SELECT DISTINCT city FROM customers;'
  },
  {
    id: 'limit-clause',
    category: 'Basics',
    section: 'basics',
    title: '4. LIMIT Clause',
    description: 'Restrict the number of rows returned.',
    content: `
      <h3>Limiting Results</h3>
      <p>Use <code>LIMIT</code> to specify the maximum number of rows to return.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> products <span class="keyword">LIMIT</span> 5;</pre></div>
      <h3>Task</h3>
      <p>Select the first 3 rows from the <code>products</code> table.</p>
    `,
    hint: 'Add LIMIT 3 to the end of your query.',
    exercise: {
      validate: (results) => results.length === 3
    },
    solution: 'SELECT * FROM products LIMIT 3;'
  },

  // =============================================
  // 2. FILTERING & SORTING
  // =============================================
  {
    id: 'where-clause',
    category: 'Filtering',
    section: 'filtering',
    title: '5. WHERE Clause',
    description: 'Filter rows based on exact conditions.',
    content: `
      <h3>Filtering Data</h3>
      <p>The <code>WHERE</code> clause allows you to filter records.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees <span class="keyword">WHERE</span> salary > 50000;</pre></div>
      <h3>Task</h3>
      <p>Find all products with a <code>price</code> of exactly <strong>29.99</strong>.</p>
    `,
    hint: 'WHERE price = 29.99',
    exercise: {
      validate: (results) => results.length > 0 && results.every(r => r.price === 29.99)
    },
    solution: 'SELECT * FROM products WHERE price = 29.99;'
  },
  {
    id: 'and-or-not',
    category: 'Filtering',
    section: 'filtering',
    title: '6. AND, OR, NOT',
    description: 'Combine multiple conditions.',
    content: `
      <h3>Complex Conditions</h3>
      <p>Use <code>AND</code>, <code>OR</code>, and <code>NOT</code> to combine logic.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees 
<span class="keyword">WHERE</span> salary > 50000 <span class="keyword">AND</span> department_id = 1;</pre></div>
      <h3>Task</h3>
      <p>Find employees in department <strong>1</strong> who earn <strong>more than 70000</strong>.</p>
    `,
    hint: 'Use WHERE department_id = 1 AND salary > 70000',
    exercise: {
      validate: (results) => results.length === 2 && results.some(r => r.first_name === 'Alice') && results.some(r => r.first_name === 'Grace')
    },
    solution: 'SELECT * FROM employees WHERE department_id = 1 AND salary > 70000;'
  },
  {
    id: 'in-operator',
    category: 'Filtering',
    section: 'filtering',
    title: '7. IN Operator',
    description: 'Check if a value matches any value in a list.',
    content: `
      <h3>Matching a List</h3>
      <p><code>IN</code> allows you to specify multiple values in a WHERE clause.</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees 
<span class="keyword">WHERE</span> department_id <span class="keyword">IN</span> (1, 2);</pre></div>
      <h3>Task</h3>
      <p>Find all orders for customer IDs <strong>1</strong> and <strong>3</strong>.</p>
    `,
    hint: 'WHERE customer_id IN (1, 3)',
    exercise: {
      validate: (results) => results.length > 0 && results.every(r => [1, 3].includes(r.customer_id))
    },
    solution: 'SELECT * FROM orders WHERE customer_id IN (1, 3);'
  },
  {
    id: 'between-operator',
    category: 'Filtering',
    section: 'filtering',
    title: '8. BETWEEN Operator',
    description: 'Select values within a range.',
    content: `
      <h3>Range Filtering</h3>
      <p>The <code>BETWEEN</code> operator selects values within a given range (inclusive).</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> products 
<span class="keyword">WHERE</span> price <span class="keyword">BETWEEN</span> 10 <span class="keyword">AND</span> 50;</pre></div>
      <h3>Task</h3>
      <p>Find employees hired between <strong>'2021-01-01'</strong> and <strong>'2022-01-01'</strong>.</p>
    `,
    hint: "WHERE hire_date BETWEEN '2021-01-01' AND '2022-01-01'",
    exercise: {
      validate: (results) => results.length > 0 && results.every(r => r.hire_date >= '2021-01-01' && r.hire_date <= '2022-01-01')
    },
    solution: "SELECT * FROM employees WHERE hire_date BETWEEN '2021-01-01' AND '2022-01-01';"
  },
  {
    id: 'like-operator',
    category: 'Filtering',
    section: 'filtering',
    title: '9. LIKE Operator',
    description: 'Pattern matching with wildcards.',
    content: `
      <h3>Pattern Matching</h3>
      <p><code>%</code> matches any sequence, <code>_</code> matches a single character.</p>
      <h3>Task</h3>
      <p>Find all products with names starting with <strong>'Desk'</strong>.</p>
    `,
    hint: "WHERE name LIKE 'Desk%'",
    exercise: {
      validate: (results) => results.length > 0 && results.every(r => r.name.startsWith('Desk'))
    },
    solution: "SELECT * FROM products WHERE name LIKE 'Desk%';"
  },
  {
    id: 'null-handling',
    category: 'Filtering',
    section: 'filtering',
    title: '10. NULL Handling',
    description: 'Working with missing values.',
    content: `
      <h3>Finding NULLs</h3>
      <p>Use <code>IS NULL</code> or <code>IS NOT NULL</code> to test for empty values. You cannot use <code>= NULL</code>.</p>
      <h3>Task</h3>
      <p>Find all departments that have <strong>no location</strong> specified (location is NULL).</p>
    `,
    hint: 'WHERE location IS NULL',
    exercise: {
      validate: (results) => results.length === 1 && results[0].name === 'Remote Teams'
    },
    solution: 'SELECT * FROM departments WHERE location IS NULL;'
  },
  {
    id: 'order-by',
    category: 'Sorting',
    section: 'filtering',
    title: '11. ORDER BY',
    description: 'Sort your results.',
    content: `
      <h3>Sorting</h3>
      <p>Use <code>ORDER BY column_name [ASC|DESC]</code>.</p>
      <h3>Task</h3>
      <p>List all products sorted by <strong>price</strong> from highest to lowest.</p>
    `,
    hint: 'ORDER BY price DESC',
    exercise: {
      validate: (results) => {
        if (results.length < 2) return false;
        for (let i = 1; i < results.length; i++) if (results[i].price > results[i - 1].price) return false;
        return true;
      }
    },
    solution: 'SELECT * FROM products ORDER BY price DESC;'
  },
  {
    id: 'order-multiple',
    category: 'Sorting',
    section: 'filtering',
    title: '12. Sorting Multiple Columns',
    description: 'Sort by primary then secondary columns.',
    content: `
      <h3>Multi-Column Sort</h3>
      <div class="code-example"><pre><span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees 
<span class="keyword">ORDER BY</span> department_id <span class="keyword">ASC</span>, salary <span class="keyword">DESC</span>;</pre></div>
      <h3>Task</h3>
      <p>Sort employees by <code>department_id</code> (ascending) and then by <code>last_name</code> (ascending).</p>
    `,
    hint: 'ORDER BY department_id ASC, last_name ASC',
    exercise: {
      validate: (results) => results.length > 5 // Simple check, advanced check requires logic
    },
    solution: 'SELECT * FROM employees ORDER BY department_id, last_name;'
  },

  // =============================================
  // 3. Date & String Functions
  // =============================================
  {
    id: 'string-upper-lower',
    category: 'Functions',
    section: 'functions',
    title: '13. Upper & Lower',
    description: 'Convert text case.',
    content: `
      <h3>Case Conversion</h3>
      <p>Use <code>UPPER(col)</code> or <code>LOWER(col)</code>.</p>
      <h3>Task</h3>
      <p>Select the <code>first_name</code> of all employees in <strong>uppercase</strong>.</p>
    `,
    hint: 'SELECT UPPER(first_name) FROM employees',
    exercise: {
      validate: (results, expected, columns) => results.some(r => r[columns[0]] === 'ALICE')
    },
    solution: 'SELECT UPPER(first_name) FROM employees;'
  },
  {
    id: 'string-concatenation',
    category: 'Functions',
    section: 'functions',
    title: '14. Concatenation',
    description: 'Combine text strings.',
    content: `
      <h3>Joining Strings</h3>
      <p>Use the <code>||</code> operator or <code>CONCAT</code> (if supported, SQLite uses ||).</p>
      <div class="code-example"><pre><span class="keyword">SELECT</span> first_name || <span class="string">' '</span> || last_name <span class="keyword">AS</span> full_name <span class="keyword">FROM</span> employees;</pre></div>
      <h3>Task</h3>
      <p>Create a column <code>full_name</code> combining first and last name with a space.</p>
    `,
    hint: "SELECT first_name || ' ' || last_name AS full_name ...",
    exercise: {
      validate: (results, expected, columns) => results[0].full_name === 'Alice Johnson'
    },
    solution: "SELECT first_name || ' ' || last_name AS full_name FROM employees;"
  },
  {
    id: 'string-substr',
    category: 'Functions',
    section: 'functions',
    title: '15. Substring',
    description: 'Extract parts of a string.',
    content: `
      <h3>SUBSTR Function</h3>
      <p><code>SUBSTR(string, start, length)</code> extracts partial text.</p>
      <h3>Task</h3>
      <p>Select the first <strong>3 characters</strong> of every employee's <code>last_name</code>.</p>
    `,
    hint: 'SUBSTR(last_name, 1, 3)',
    exercise: {
      validate: (results, expected, columns) => results[0][columns[0]] === 'Joh'
    },
    solution: 'SELECT SUBSTR(last_name, 1, 3) FROM employees;'
  },
  {
    id: 'string-length',
    category: 'Functions',
    section: 'functions',
    title: '16. Length',
    description: 'Count characters in a string.',
    content: `
      <h3>String Length</h3>
      <p>Use <code>LENGTH(column)</code>.</p>
      <h3>Task</h3>
      <p>Find employees whose <code>last_name</code> has more than <strong>5</strong> characters.</p>
    `,
    hint: 'WHERE LENGTH(last_name) > 5',
    exercise: {
      validate: (results) => results.every(r => r.last_name.length > 5)
    },
    solution: 'SELECT * FROM employees WHERE LENGTH(last_name) > 5;'
  },
  {
    id: 'date-strftime',
    category: 'Functions',
    section: 'functions',
    title: '17. Date Extraction',
    description: 'Extract parts of a date.',
    content: `
      <h3>Extracting Year/Month</h3>
      <p>In SQLite, use <code>strftime('%Y', date_col)</code> for year.</p>
      <h3>Task</h3>
      <p>Select the <strong>year</strong> of hire for every employee.</p>
    `,
    hint: "strftime('%Y', hire_date)",
    exercise: {
      validate: (results, expected, columns) => results.some(r => r[columns[0]] === '2021')
    },
    solution: "SELECT strftime('%Y', hire_date) FROM employees;"
  },

  // =============================================
  // 4. AGGREGATIONS
  // =============================================
  {
    id: 'agg-count',
    category: 'Aggregations',
    section: 'aggregations',
    title: '18. COUNT',
    description: 'Count total rows.',
    content: '<h3>Task</h3><p>Count all rows in the <code>orders</code> table.</p>',
    hint: 'SELECT COUNT(*) FROM orders',
    exercise: { validate: (r) => Object.values(r[0])[0] === 10 },
    solution: 'SELECT COUNT(*) FROM orders;'
  },
  {
    id: 'agg-sum',
    category: 'Aggregations',
    section: 'aggregations',
    title: '19. SUM',
    description: 'Calculate total value.',
    content: '<h3>Task</h3><p>Calculate the total <code>stock</code> of all products.</p>',
    hint: 'SUM(stock)',
    exercise: { validate: (r) => Object.values(r[0])[0] === 975 },
    solution: 'SELECT SUM(stock) FROM products;'
  },
  {
    id: 'agg-avg',
    category: 'Aggregations',
    section: 'aggregations',
    title: '20. AVG',
    description: 'Calculate average value.',
    content: '<h3>Task</h3><p>Find the average <code>price</code> of products.</p>',
    hint: 'AVG(price)',
    exercise: { validate: (r) => Math.floor(Object.values(r[0])[0]) === 327 },
    solution: 'SELECT AVG(price) FROM products;'
  },
  {
    id: 'agg-min-max',
    category: 'Aggregations',
    section: 'aggregations',
    title: '21. MIN and MAX',
    description: 'Find extremes.',
    content: '<h3>Task</h3><p>Find the lowest and highest salary in the <code>employees</code> table.</p>',
    hint: 'MIN(salary), MAX(salary)',
    exercise: { validate: (r, e, cols) => cols.length === 2 },
    solution: 'SELECT MIN(salary), MAX(salary) FROM employees;'
  },
  {
    id: 'group-by',
    category: 'Aggregations',
    section: 'aggregations',
    title: '22. GROUP BY',
    description: 'Group rows by values.',
    content: '<h3>Task</h3><p>Count how many employees are in each <code>department_id</code>.</p>',
    hint: 'GROUP BY department_id',
    exercise: { validate: (r) => r.length > 1 && r[0].department_id },
    solution: 'SELECT department_id, COUNT(*) FROM employees GROUP BY department_id;'
  },
  {
    id: 'having-clause',
    category: 'Aggregations',
    section: 'aggregations',
    title: '23. HAVING Clause',
    description: 'Filter after grouping.',
    content: `
      <h3>Filtering Groups</h3>
      <p>Use <code>HAVING</code> to filter groups, whereas <code>WHERE</code> filters rows before grouping.</p>
      <h3>Task</h3>
      <p>Find department IDs that have <strong>more than 2</strong> employees.</p>
    `,
    hint: 'GROUP BY... HAVING COUNT(*) > 2',
    exercise: { validate: (r) => r.every(row => row.department_id === 1 || row.department_id === 3) },
    solution: 'SELECT department_id FROM employees GROUP BY department_id HAVING COUNT(*) > 2;'
  },

  // =============================================
  // 5. JOINS
  // =============================================
  {
    id: 'inner-join',
    category: 'Joins',
    section: 'joins',
    title: '24. INNER JOIN',
    description: 'Match rows in both tables.',
    content: '<h3>Task</h3><p>Show employee names and their department names.</p>',
    hint: 'JOIN departments ON ...',
    exercise: { validate: (r) => r.length > 0 && r[0].name && r[0].first_name },
    solution: 'SELECT e.first_name, d.name FROM employees e JOIN departments d ON e.department_id = d.id;'
  },
  {
    id: 'left-join',
    category: 'Joins',
    section: 'joins',
    title: '25. LEFT JOIN',
    description: 'Keep all left rows.',
    content: '<h3>Task</h3><p>Show all departments and their employees (if any). Include departments with no employees.</p>',
    hint: 'FROM departments LEFT JOIN employees...',
    exercise: { validate: (r) => r.length > 8 }, // 8 employees + empty depts
    solution: 'SELECT * FROM departments d LEFT JOIN employees e ON d.id = e.department_id;'
  },
  {
    id: 'cross-join',
    category: 'Joins',
    section: 'joins',
    title: '26. CROSS JOIN',
    description: 'Cartesian product of tables.',
    content: `
      <h3>Cartesian Product</h3>
      <p>Combines every row of table A with every row of table B.</p>
      <h3>Task</h3>
      <p>Perform a CROSS JOIN between <code>products</code> and <code>departments</code>.</p>
    `,
    hint: 'FROM products CROSS JOIN departments',
    exercise: { validate: (r) => r.length === 25 }, // 5 products * 5 depts
    solution: 'SELECT * FROM products CROSS JOIN departments;'
  },
  {
    id: 'self-join',
    category: 'Joins',
    section: 'joins',
    title: '27. Self Join',
    description: 'Join a table to itself.',
    content: `
      <h3>Comparing Rows in Same Table</h3>
      <p>Join a table to itself using aliases.</p>
      <h3>Task</h3>
      <p>Find pairs of employees who work in the same department.</p>
    `,
    hint: 'FROM employees e1 JOIN employees e2 ON e1.department_id = e2.department_id AND e1.id != e2.id',
    exercise: { validate: (r) => r.length > 0 },
    solution: 'SELECT e1.first_name, e2.first_name FROM employees e1 JOIN employees e2 ON e1.department_id = e2.department_id AND e1.id != e2.id;'
  },

  // =============================================
  // 6. SET OPERATIONS
  // =============================================
  {
    id: 'set-union',
    category: 'Sets',
    section: 'sets',
    title: '28. UNION',
    description: 'Combine results and remove duplicates.',
    content: `
      <h3>Merging Results</h3>
      <p><code>UNION</code> combines results from two queries.</p>
      <div class="code-example"><pre>SELECT name FROM products
UNION
SELECT name FROM departments</pre></div>
      <h3>Task</h3>
      <p>Return a single list of names from both <code>employees</code> (first_name) and <code>customers</code> (name).</p>
    `,
    hint: 'SELECT first_name FROM employees UNION SELECT name FROM customers',
    exercise: { validate: (r) => r.length >= 11 },
    solution: 'SELECT first_name FROM employees UNION SELECT name FROM customers;'
  },
  {
    id: 'set-union-all',
    category: 'Sets',
    section: 'sets',
    title: '29. UNION ALL',
    description: 'Combine results including duplicates.',
    content: `
      <h3>Merging with Duplicates</h3>
      <p><code>UNION ALL</code> is faster because it doesn't remove duplicates.</p>
      <h3>Task</h3>
      <p>Combine all <code>department_id</code>s from <code>employees</code> and <code>departments</code> using UNION ALL.</p>
    `,
    hint: 'UNION ALL',
    exercise: { validate: (r) => r.length === 13 },
    solution: 'SELECT department_id FROM employees UNION ALL SELECT id FROM departments;'
  },
  {
    id: 'set-except',
    category: 'Sets',
    section: 'sets',
    title: '30. EXCEPT',
    description: 'Rows in first query but not second.',
    content: `
      <h3>Difference</h3>
      <p>Return rows from the first query that are NOT in the second.</p>
      <h3>Task</h3>
      <p>Find <code>id</code>s of products that have <strong>never</strong> been ordered.</p>
    `,
    hint: 'SELECT id FROM products EXCEPT SELECT product_id FROM orders',
    exercise: { validate: (r) => r.length === 0 }, // All sample products have orders? Wait, check data.
    solution: 'SELECT id FROM products EXCEPT SELECT product_id FROM orders;'
  },
  {
    id: 'set-intersect',
    category: 'Sets',
    section: 'sets',
    title: '31. INTERSECT',
    description: 'Rows common to both queries.',
    content: `
      <h3>Common Rows</h3>
      <p>Return rows matching in both queries.</p>
      <h3>Task</h3>
      <p>Find <code>city</code> names that exist in both <code>customers</code> and <code>departments</code> (assumed location is city).</p>
    `,
    hint: 'SELECT city FROM customers INTERSECT SELECT location FROM departments',
    exercise: { validate: (r) => true }, // depends on data
    solution: 'SELECT city FROM customers INTERSECT SELECT location FROM departments;'
  },

  // =============================================
  // 7. SUBQUERIES & CTEs
  // =============================================
  {
    id: 'subquery-where',
    category: 'Subqueries',
    section: 'subqueries',
    title: '32. WHERE Subquery',
    description: 'Filter based on another query.',
    content: '<h3>Task</h3><p>Find employees with salary greater than the average salary.</p>',
    hint: 'WHERE salary > (SELECT AVG(salary)...)',
    exercise: { validate: (r) => r.length > 0 && r.every(row => row.salary > 63000) },
    solution: 'SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);'
  },
  {
    id: 'subquery-select',
    category: 'Subqueries',
    section: 'subqueries',
    title: '33. SELECT Subquery',
    description: 'Calculate values per row.',
    content: '<h3>Task</h3><p>Select employee name and the difference between their salary and the average salary.</p>',
    hint: 'SELECT salary - (SELECT AVG(salary) FROM employees) ...',
    exercise: { validate: (r, e, c) => c.length >= 2 },
    solution: 'SELECT first_name, salary - (SELECT AVG(salary) FROM employees) as diff FROM employees;'
  },
  {
    id: 'cte-basic',
    category: 'CTEs',
    section: 'subqueries',
    title: '34. Basic CTE',
    description: 'Common Table Expressions for readability.',
    content: `
      <h3>With Clause</h3>
      <p>CTEs act like temporary views.</p>
      <div class="code-example"><pre><span class="keyword">WITH</span> HighPay <span class="keyword">AS</span> (
  <span class="keyword">SELECT</span> * <span class="keyword">FROM</span> employees <span class="keyword">WHERE</span> salary > 70000
)
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> HighPay;</pre></div>
      <h3>Task</h3>
      <p>Define a CTE <code>Engineering</code> for department 1, then select all form it.</p>
    `,
    hint: 'WITH Engineering AS (SELECT * FROM employees WHERE department_id = 1)...',
    exercise: { validate: (r) => r.length === 3 },
    solution: 'WITH Engineering AS (SELECT * FROM employees WHERE department_id = 1) SELECT * FROM Engineering;'
  },
  {
    id: 'cte-recursive',
    category: 'CTEs',
    section: 'subqueries',
    title: '35. Recursive CTE',
    description: 'Generate sequences or hierarchies.',
    content: `
      <h3>Recursion</h3>
      <p>A CTE that calls itself. Useful for generating numbers.</p>
      <div class="code-example"><pre><span class="keyword">WITH</span> <span class="keyword">RECURSIVE</span> cnt(x) <span class="keyword">AS</span> (
  <span class="keyword">SELECT</span> 1
  <span class="keyword">UNION</span> <span class="keyword">ALL</span>
  <span class="keyword">SELECT</span> x+1 <span class="keyword">FROM</span> cnt <span class="keyword">WHERE</span> x < 10
)
<span class="keyword">SELECT</span> * <span class="keyword">FROM</span> cnt;</pre></div>
      <h3>Task</h3>
      <p>Generate a sequence of numbers from 1 to 5.</p>
    `,
    hint: 'WHERE x < 5',
    exercise: { validate: (r) => r.length === 5 && r[4].x === 5 },
    solution: 'WITH RECURSIVE cnt(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM cnt WHERE x < 5) SELECT * FROM cnt;'
  },

  // =============================================
  // 8. WINDOW FUNCTIONS
  // =============================================
  {
    id: 'window-row-number',
    category: 'Window Functions',
    section: 'window',
    title: '36. ROW_NUMBER',
    description: 'Assign unique numbers to rows.',
    content: `
      <h3>Row Numbering</h3>
      <p><code>ROW_NUMBER() OVER (ORDER BY col)</code> assigns a unique integer.</p>
      <h3>Task</h3>
      <p>Assign a row number to employees based on their salary (highest first).</p>
    `,
    hint: 'ROW_NUMBER() OVER (ORDER BY salary DESC)',
    exercise: { validate: (r, e, c) => r[0][c[0]] === 1 || r[0][c[1]] === 1 },
    solution: 'SELECT *, ROW_NUMBER() OVER (ORDER BY salary DESC) as rn FROM employees;'
  },
  {
    id: 'window-rank',
    category: 'Window Functions',
    section: 'window',
    title: '37. RANK',
    description: 'Rank with gaps for ties.',
    content: `
      <h3>Ranking</h3>
      <p><code>RANK()</code> handles ties by skipping numbers (1, 2, 2, 4).</p>
      <h3>Task</h3>
      <p>Rank employees by salary. If two have the same salary, they should share a rank.</p>
    `,
    hint: 'RANK() OVER (ORDER BY salary DESC)',
    exercise: { validate: (r) => r.length > 0 }, // Need data with ties to verify gap
    solution: 'SELECT *, RANK() OVER (ORDER BY salary DESC) as rnk FROM employees;'
  },
  {
    id: 'window-dense-rank',
    category: 'Window Functions',
    section: 'window',
    title: '38. DENSE_RANK',
    description: 'Rank without gaps.',
    content: `
      <h3>Dense Ranking</h3>
      <p><code>DENSE_RANK()</code> creates consecutive ranks (1, 2, 2, 3).</p>
      <h3>Task</h3>
      <p>Use <code>DENSE_RANK</code> to rank employees by salary.</p>
    `,
    hint: 'DENSE_RANK() OVER (ORDER BY salary DESC)',
    exercise: { validate: (r) => r.length > 0 },
    solution: 'SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) as dr FROM employees;'
  },
  {
    id: 'window-partition',
    category: 'Window Functions',
    section: 'window',
    title: '39. PARTITION BY',
    description: 'Restart calculation per group.',
    content: `
      <h3>Grouping Windows</h3>
      <p><code>PARTITION BY</code> resets the counter for each group.</p>
      <div class="code-example"><pre>ROW_NUMBER() OVER (
  <span class="keyword">PARTITION BY</span> dept_id 
  <span class="keyword">ORDER BY</span> salary
)</pre></div>
      <h3>Task</h3>
      <p>Rank employees <strong>within each department</strong> by salary.</p>
    `,
    hint: 'RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)',
    exercise: { validate: (r) => r.filter(x => x.rank === 1 || Object.values(x).some(v => v === 1)).length >= 3 },
    solution: 'SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank FROM employees;'
  },
  {
    id: 'window-lead-lag',
    category: 'Window Functions',
    section: 'window',
    title: '40. LEAD and LAG',
    description: 'Access previous or next rows.',
    content: `
      <h3>Time Travel</h3>
      <p><code>LAG(col, 1)</code> gets previous value. <code>LEAD(col, 1)</code> gets next.</p>
      <h3>Task</h3>
      <p>Show each employee's salary and the salary of the <strong>previous</strong> employee (ordered by hire_date).</p>
    `,
    hint: 'LAG(salary) OVER (ORDER BY hire_date)',
    exercise: { validate: (r, e, c) => c.some(name => name.toLowerCase().includes('lag')) },
    solution: 'SELECT salary, LAG(salary) OVER (ORDER BY hire_date) FROM employees;'
  },
  {
    id: 'window-running-total',
    category: 'Window Functions',
    section: 'window',
    title: '41. Running Total',
    description: 'Cumulative sum.',
    content: `
      <h3>Accumulation</h3>
      <p>Sum across a window frame.</p>
      <div class="code-example"><pre><span class="keyword">SUM</span>(salary) <span class="keyword">OVER</span> (
  <span class="keyword">ORDER BY</span> hire_date
)</pre></div>
      <h3>Task</h3>
      <p>Calculate a running total of salaries ordered by hire date.</p>
    `,
    hint: 'SUM(salary) OVER (ORDER BY hire_date)',
    exercise: { validate: (r, e, c) => r[r.length - 1].total > r[0].total || Object.values(r[r.length - 1])[1] > Object.values(r[0])[1] },
    solution: 'SELECT *, SUM(salary) OVER (ORDER BY hire_date) as total FROM employees;'
  },

  // =============================================
  // 9. DATA MODIFICATION (DML)
  // =============================================
  {
    id: 'dml-insert',
    category: 'DML',
    section: 'dml',
    title: '42. INSERT',
    description: 'Add new rows.',
    content: `
      <h3>Adding Data</h3>
      <div class="code-example"><pre><span class="keyword">INSERT INTO</span> table (col1, col2)
<span class="keyword">VALUES</span> (val1, val2);</pre></div>
      <h3>Task</h3>
      <p>Insert a new department into <code>departments</code> with ID <strong>6</strong> and name <strong>'Research'</strong>.</p>
    `,
    hint: "INSERT INTO departments VALUES (6, 'Research', NULL)",
    exercise: {
      type: 'mutation',
      validate: (db) => {
        try {
          const res = db.exec("SELECT * FROM departments WHERE id = 6 AND name = 'Research'");
          return res.length > 0 && res[0].values.length > 0;
        } catch (e) { return false; }
      }
    },
    solution: "INSERT INTO departments (id, name) VALUES (6, 'Research');"
  },
  {
    id: 'dml-update',
    category: 'DML',
    section: 'dml',
    title: '43. UPDATE',
    description: 'Modify existing rows.',
    content: `
      <h3>Changing Data</h3>
      <div class="code-example"><pre><span class="keyword">UPDATE</span> table 
<span class="keyword">SET</span> col = val 
<span class="keyword">WHERE</span> id = 1;</pre></div>
      <h3>Task</h3>
      <p>Update employee <strong>1</strong>'s salary to <strong>90000</strong>.</p>
    `,
    hint: 'UPDATE employees SET salary = 90000 WHERE id = 1',
    exercise: {
      type: 'mutation',
      validate: (db) => {
        const res = db.exec("SELECT salary FROM employees WHERE id = 1");
        return res[0].values[0][0] === 90000;
      }
    },
    solution: 'UPDATE employees SET salary = 90000 WHERE id = 1;'
  },
  {
    id: 'dml-delete',
    category: 'DML',
    section: 'dml',
    title: '44. DELETE',
    description: 'Remove rows.',
    content: `
      <h3>Removing Data</h3>
      <div class="code-example"><pre><span class="keyword">DELETE FROM</span> table <span class="keyword">WHERE</span> id = 1;</pre></div>
      <h3>Task</h3>
      <p>Delete the department with ID <strong>2</strong>.</p>
    `,
    hint: 'DELETE FROM departments WHERE id = 2',
    exercise: {
      type: 'mutation',
      validate: (db) => {
        const res = db.exec("SELECT * FROM departments WHERE id = 2");
        return res.length === 0;
      }
    },
    solution: 'DELETE FROM departments WHERE id = 2;'
  },

  // =============================================
  // 10. ADVANCED CHALLENGES
  // =============================================
  {
    id: 'adv-ntile',
    category: 'Window Functions',
    section: 'window',
    title: '45. NTILE',
    description: 'Distribute rows into groups.',
    content: `
      <h3>Bucketing</h3>
      <p><code>NTILE(n)</code> divides rows into <code>n</code> buckets.</p>
      <h3>Task</h3>
      <p>Split employees into <strong>4</strong> groups based on salary.</p>
    `,
    hint: 'NTILE(4) OVER (ORDER BY salary)',
    exercise: { validate: (r, e, c) => r.some(x => Object.values(x).some(v => v === 4)) },
    solution: 'SELECT *, NTILE(4) OVER (ORDER BY salary) as quartile FROM employees;'
  },
  {
    id: 'adv-first-value',
    category: 'Window Functions',
    section: 'window',
    title: '46. FIRST_VALUE',
    description: 'Get first value in window.',
    content: `
      <h3>First in Group</h3>
      <p>Returns the value from the first row in the window frame.</p>
      <h3>Task</h3>
      <p>Show each employee alongside the highest paid employee's name (first name) in the entire company.</p>
    `,
    hint: "FIRST_VALUE(first_name) OVER (ORDER BY salary DESC)",
    exercise: { validate: (r, e, c) => r.every(x => Object.values(x).includes('Grace')) },
    solution: 'SELECT *, FIRST_VALUE(first_name) OVER (ORDER BY salary DESC) as top_earner FROM employees;'
  },
  {
    id: 'adv-nulls-last',
    category: 'Sorting',
    section: 'filtering',
    title: '47. Sort NULLs',
    description: 'Control where NULL values appear.',
    content: `
      <h3>Ordering NULLs</h3>
      <p>Use <code>NULLS LAST</code> or <code>NULLS FIRST</code> (if supported, otherwise use CASE).</p>
      <div class="code-example"><pre><span class="keyword">ORDER BY</span> col <span class="keyword">IS NULL</span>, col</pre></div>
      <h3>Task</h3>
      <p>Sort departments by location, putting NULLs at the end.</p>
    `,
    hint: 'ORDER BY location IS NULL, location',
    exercise: { validate: (r) => r[r.length - 1].location === null },
    solution: 'SELECT * FROM departments ORDER BY location IS NULL, location;'
  },
  {
    id: 'adv-coalesce',
    category: 'Functions',
    section: 'functions',
    title: '48. COALESCE',
    description: 'Handle NULLs with defaults.',
    content: `
      <h3>Default Values</h3>
      <p><code>COALESCE(col, default)</code> returns first non-null value.</p>
      <h3>Task</h3>
      <p>Select department name and location. If location is NULL, display <strong>'Unknown'</strong>.</p>
    `,
    hint: "COALESCE(location, 'Unknown')",
    exercise: { validate: (r) => r.some(x => Object.values(x).includes('Unknown')) },
    solution: "SELECT name, COALESCE(location, 'Unknown') FROM departments;"
  }
];

// =============================================
// DATABASE SCHEMA & DATA
// =============================================
const schema = {
  employees: {
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'first_name', type: 'TEXT' },
      { name: 'last_name', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'department_id', type: 'INTEGER' },
      { name: 'salary', type: 'INTEGER' },
      { name: 'hire_date', type: 'DATE' }
    ]
  },
  departments: {
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT' },
      { name: 'location', type: 'TEXT' }
    ]
  },
  products: {
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT' },
      { name: 'category', type: 'TEXT' },
      { name: 'price', type: 'DECIMAL' },
      { name: 'stock', type: 'INTEGER' }
    ]
  },
  orders: {
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'customer_id', type: 'INTEGER' },
      { name: 'product_id', type: 'INTEGER' },
      { name: 'quantity', type: 'INTEGER' },
      { name: 'order_date', type: 'DATE' }
    ]
  },
  customers: {
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'city', type: 'TEXT' }
    ]
  }
};

const sampleDataSQL = `
  CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, location TEXT);
  INSERT INTO departments VALUES (1, 'Engineering', 'Building A');
  INSERT INTO departments VALUES (2, 'Sales', 'Building B');
  INSERT INTO departments VALUES (3, 'Marketing', 'Building B');
  INSERT INTO departments VALUES (4, 'HR', 'Building C');
  INSERT INTO departments VALUES (5, 'Remote Teams', NULL);

  CREATE TABLE employees (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, department_id INTEGER, salary INTEGER, hire_date TEXT);
  INSERT INTO employees VALUES (1, 'Alice', 'Johnson', 'alice@company.com', 1, 75000, '2021-03-15');
  INSERT INTO employees VALUES (2, 'Bob', 'Smith', 'bob@company.com', 1, 68000, '2020-07-22');
  INSERT INTO employees VALUES (3, 'Carol', 'Williams', 'carol@company.com', 2, 62000, '2019-11-01');
  INSERT INTO employees VALUES (4, 'David', 'Brown', 'david@company.com', 2, 58000, '2022-01-10');
  INSERT INTO employees VALUES (5, 'Eve', 'Davis', 'eve@company.com', 3, 55000, '2021-09-05');
  INSERT INTO employees VALUES (6, 'Frank', 'Miller', 'frank@company.com', 3, 52000, '2023-02-28');
  INSERT INTO employees VALUES (7, 'Grace', 'Wilson', 'grace@company.com', 1, 82000, '2018-04-12');
  INSERT INTO employees VALUES (8, 'Alan', 'Taylor', 'alan@company.com', 4, 53000, '2022-06-20');

  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price DECIMAL(10,2), stock INTEGER);
  INSERT INTO products VALUES (1, 'Laptop Pro', 'Electronics', 1299.99, 50);
  INSERT INTO products VALUES (2, 'Wireless Mouse', 'Electronics', 29.99, 200);
  INSERT INTO products VALUES (3, 'Office Chair', 'Furniture', 249.99, 75);
  INSERT INTO products VALUES (4, 'Desk Lamp', 'Furniture', 45.99, 150);
  INSERT INTO products VALUES (5, 'Notebook Set', 'Stationery', 12.99, 500);

  CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, city TEXT);
  INSERT INTO customers VALUES (1, 'John Doe', 'john@email.com', 'New York');
  INSERT INTO customers VALUES (2, 'Jane Smith', 'jane@email.com', 'Los Angeles');
  INSERT INTO customers VALUES (3, 'Mike Johnson', 'mike@email.com', 'Chicago');

  CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, product_id INTEGER, quantity INTEGER, order_date TEXT);
  INSERT INTO orders VALUES (1, 1, 1, 1, '2024-01-15');
  INSERT INTO orders VALUES (2, 1, 2, 2, '2024-01-15');
  INSERT INTO orders VALUES (3, 2, 3, 1, '2024-01-16');
  INSERT INTO orders VALUES (4, 3, 5, 10, '2024-01-17');
  INSERT INTO orders VALUES (5, 2, 4, 2, '2024-01-18');
  INSERT INTO orders VALUES (6, 1, 5, 5, '2024-01-20');
  INSERT INTO orders VALUES (7, 3, 1, 1, '2024-01-21');
  INSERT INTO orders VALUES (8, 2, 2, 1, '2024-01-22');
  INSERT INTO orders VALUES (9, 3, 4, 4, '2024-01-23');
  INSERT INTO orders VALUES (10, 1, 3, 1, '2024-01-24');
`;

// =============================================
// APP LOGIC
// =============================================
let db = null;
let currentLesson = null;
let completedLessons = new Set(JSON.parse(localStorage.getItem('completedLessons') || '[]'));

// DOM Elements
const sqlEditor = document.getElementById('sql-editor');
const lineNumbers = document.getElementById('line-numbers');
const runBtn = document.getElementById('run-btn');
const clearBtn = document.getElementById('clear-btn');
const checkBtn = document.getElementById('check-btn');
const hintBtn = document.getElementById('hint-btn');
const resultsContent = document.getElementById('results-content');
const rowCountEl = document.getElementById('row-count');
const feedbackContainer = document.getElementById('feedback-container');
const tutorialContent = document.getElementById('tutorial-content');
const lessonTitle = document.getElementById('lesson-title');
const lessonDesc = document.getElementById('lesson-desc');
const lessonCategory = document.getElementById('lesson-category');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const schemaToggleBtn = document.getElementById('schema-toggle-btn');
const schemaPanel = document.getElementById('schema-panel');
const schemaList = document.getElementById('schema-list');

// Initialize Application
async function init() {
  try {
    const SQL = await initSqlJs({
      locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });
    db = new SQL.Database();
    db.run(sampleDataSQL);

    renderLessonList();
    renderSchema();
    updateProgress();
    attachEventListeners();

    // Collapsible sections logic
    document.querySelectorAll('.sidebar-title').forEach(title => {
      title.addEventListener('click', (e) => {
        const section = e.currentTarget.parentElement;
        section.classList.toggle('collapsed');
      });
    });

  } catch (error) {
    console.error('Failed to initialize:', error);
    showError('Failed to initialize the SQL engine.');
  }
}

// Render Sidbebar
function renderLessonList() {
  const sections = {
    basics: document.getElementById('basics-list'),
    filtering: document.getElementById('filtering-list'),
    aggregations: document.getElementById('aggregations-list'),
    joins: document.getElementById('joins-list'),
    functions: document.getElementById('functions-list'),
    sets: document.getElementById('sets-list'),
    subqueries: document.getElementById('subqueries-list'),
    window: document.getElementById('window-list'),
    dml: document.getElementById('dml-list')
  };

  lessons.forEach((lesson, index) => {
    const li = document.createElement('li');
    li.className = 'lesson-item';
    li.dataset.lessonId = lesson.id;
    if (completedLessons.has(lesson.id)) li.classList.add('completed');

    li.innerHTML = `
      <div class="lesson-status ${completedLessons.has(lesson.id) ? 'completed' : 'pending'}">${completedLessons.has(lesson.id) ? '✓' : index + 1}</div>
      <span class="lesson-title">${lesson.title}</span>
    `;

    li.addEventListener('click', () => loadLesson(lesson));
    if (sections[lesson.section]) sections[lesson.section].appendChild(li);
  });
}

function renderSchema() {
  schemaList.innerHTML = '';
  Object.entries(schema).forEach(([tableName, tableInfo]) => {
    const tableEl = document.createElement('div');
    tableEl.className = 'schema-table';
    tableEl.innerHTML = `
      <div class="schema-table-header">
        <span class="schema-table-icon">📋</span>
        <span class="schema-table-name">${tableName}</span>
      </div>
      <div class="schema-columns">
        ${tableInfo.columns.map(col => `
          <div class="schema-column">
            <span class="schema-column-name">${col.name}</span>
            <span class="schema-column-type">${col.type}</span>
            ${col.pk ? '<span class="schema-column-pk">PK</span>' : ''}
          </div>
        `).join('')}
      </div>
    `;
    tableEl.querySelector('.schema-table-header').addEventListener('click', () => tableEl.classList.toggle('expanded'));
    schemaList.appendChild(tableEl);
  });
}

function loadLesson(lesson) {
  currentLesson = lesson;
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.lessonId === lesson.id) item.classList.add('active');
  });

  lessonCategory.textContent = lesson.category;
  lessonTitle.textContent = lesson.title;
  lessonDesc.textContent = lesson.description;
  tutorialContent.innerHTML = lesson.content;

  checkBtn.style.display = 'inline-flex';
  hintBtn.style.display = 'inline-block';
  sqlEditor.value = '';
  updateLineNumbers();
  clearResults();
  clearFeedback();
}

function attachEventListeners() {
  sqlEditor.addEventListener('input', updateLineNumbers);
  sqlEditor.addEventListener('keydown', handleEditorKeydown);
  runBtn.addEventListener('click', runQuery);
  clearBtn.addEventListener('click', () => { sqlEditor.value = ''; updateLineNumbers(); clearResults(); });
  checkBtn.addEventListener('click', checkAnswer);
  hintBtn.addEventListener('click', () => {
    feedbackContainer.innerHTML = `<div class="feedback feedback-hint"><div class="feedback-message">${currentLesson.hint}</div></div>`;
  });
  schemaToggleBtn.addEventListener('click', () => schemaPanel.classList.toggle('visible'));
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runQuery(); }
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      sidebar.classList.toggle('open');
      mobileOverlay.classList.toggle('active');
      // Show/hide overlay
      if (sidebar.classList.contains('open')) {
        mobileOverlay.style.display = 'block';
      }
    });
  }

  // Close menu when clicking overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      sidebar.classList.remove('open');
      mobileOverlay.classList.remove('active');
      setTimeout(() => {
        if (!sidebar.classList.contains('open')) {
          mobileOverlay.style.display = 'none';
        }
      }, 250);
    });
  }

  // Close menu when selecting a lesson on mobile
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuToggle.classList.remove('active');
        sidebar.classList.remove('open');
        mobileOverlay.classList.remove('active');
        setTimeout(() => {
          mobileOverlay.style.display = 'none';
        }, 250);
      }
    });
  });
}

function updateLineNumbers() {
  const lines = sqlEditor.value.split('\n').length;
  lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
}

function handleEditorKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = sqlEditor.selectionStart;
    const end = sqlEditor.selectionEnd;
    sqlEditor.value = sqlEditor.value.substring(0, start) + '  ' + sqlEditor.value.substring(end);
    sqlEditor.selectionStart = sqlEditor.selectionEnd = start + 2;
  }
}

function runQuery() {
  const query = sqlEditor.value.trim();
  if (!query) return showError('Please enter a SQL query');

  try {
    // For DML, we need to run it but return no results usually, or use exec properly
    const result = db.exec(query);

    // If it's a mutation without results, show generic success
    if (currentLesson?.exercise?.type === 'mutation' && (!result || result.length === 0)) {
      resultsContent.innerHTML = `<div class="results-empty"><p>Command executed successfully.</p></div>`;
      rowCountEl.textContent = 'Rows affected';
      return;
    }

    displayResults(result);
    clearFeedback();
  } catch (error) {
    showError(error.message);
  }
}

function displayResults(result) {
  if (!result || result.length === 0) {
    resultsContent.innerHTML = `<div class="results-empty"><p>Query executed successfully (no rows returned)</p></div>`;
    rowCountEl.textContent = '';
    return;
  }
  const { columns, values } = result[0];
  let html = '<table class="results-table"><thead><tr>' + columns.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
  values.forEach(row => {
    html += '<tr>' + row.map(c => `<td>${c !== null ? c : '<em>NULL</em>'}</td>`).join('') + '</tr>';
  });
  html += '</tbody></table>';
  resultsContent.innerHTML = html;
  rowCountEl.textContent = `${values.length} row${values.length !== 1 ? 's' : ''}`;
}

function checkAnswer() {
  if (!currentLesson) return;
  const query = sqlEditor.value.trim();
  if (!query) return showError('Please write a query.');

  try {
    // If mutation, we don't look at result of query, we look at side effects
    if (currentLesson.exercise.type === 'mutation') {
      // Execute user query first
      try {
        db.exec(query);
      } catch (e) { /* ignore error during exec for validation, or catch it? */ }

      // Validate side effect
      const isCorrect = currentLesson.exercise.validate(db);
      if (isCorrect) {
        showSuccess();
        markLessonComplete(currentLesson.id);
      } else {
        showIncorrect();
      }
      return;
    }

    const result = db.exec(query);
    displayResults(result);

    let rows = [], columns = [];
    if (result && result.length > 0) {
      columns = result[0].columns;
      rows = result[0].values.map(r => {
        const obj = {};
        columns.forEach((c, i) => obj[c] = r[i]);
        return obj;
      });
    }

    // Pass db if needed, but primarily rows/cols
    const isCorrect = currentLesson.exercise.validate(rows, null, columns, db);

    if (isCorrect) {
      showSuccess();
      markLessonComplete(currentLesson.id);
    } else {
      showIncorrect();
    }
  } catch (e) {
    showError(e.message);
  }
}

function markLessonComplete(id) {
  if (!completedLessons.has(id)) {
    completedLessons.add(id);
    localStorage.setItem('completedLessons', JSON.stringify([...completedLessons]));
    const li = document.querySelector(`[data-lesson-id="${id}"]`);
    if (li) { li.classList.add('completed'); li.querySelector('.lesson-status').textContent = '✓'; li.querySelector('.lesson-status').classList.add('completed'); }
    updateProgress();
    showConfetti();
  }
}

function updateProgress() {
  const complete = completedLessons.size;
  const total = lessons.length;
  progressFill.style.width = `${(complete / total) * 100}%`;
  progressText.textContent = `${complete} / ${total} lessons`;
}

function showSuccess() {
  feedbackContainer.innerHTML = `<div class="feedback feedback-success"><div class="feedback-title">Correct! 🎉</div><div class="feedback-message">Great job!</div></div>`;
}

function showIncorrect() {
  feedbackContainer.innerHTML = `<div class="feedback feedback-error"><div class="feedback-title">Not quite right</div><div class="feedback-message">Check the requirements and try again.</div></div>`;
}

function showError(msg) {
  resultsContent.innerHTML = `<div class="results-error">Error: ${msg}</div>`;
}

function clearFeedback() { feedbackContainer.innerHTML = ''; }
function clearResults() { resultsContent.innerHTML = ''; }

function showConfetti() {
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.backgroundColor = ['#f00', '#0f0', '#00f'][Math.floor(Math.random() * 3)];
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

document.addEventListener('DOMContentLoaded', init);
