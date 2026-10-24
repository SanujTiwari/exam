export const branding = {
  name: 'AptitudeLab',
  shortName: 'AL',
  productName: 'Practice Assessment',
  tagline: 'Independent skills practice',
  accent: '#12649f',
  supportEmail: 'support@aptitudelab.practice',
};

export const assessmentConfig = {
  id: 'core-practice-assessment',
  title: 'Graduate Practice Assessment',
  description:
    'A timed, multi-section practice assessment designed for independent preparation.',
  securityQuestions: [
    'What is the name of your first school?',
    'What is your favourite book?',
    'What city were you born in?',
    'What is the name of a childhood pet?',
  ],
  languages: {
    assessment: 'English (US)',
    navigation: 'English (US)',
  },
  navigation: {
    sequentialSections: true,
    allowPrevious: true,
    allowFlagging: true,
    showQuestionNumbers: true,
  },
  privacy: {
    lastUpdated: '22 October 2026',
  },
  sections: [
    {
      id: 'english',
      name: 'English Ability',
      shortName: 'English',
      durationMinutes: 15,
      instructions:
        'Choose the most appropriate answer for each question. Read each sentence or passage carefully before selecting an option.',
      questions: [
        {
          id: 'en-1',
          type: 'multiple-choice',
          prompt: 'The team ___ working on the report since morning.',
          options: ['has been', 'have been', 'is being', 'are being'],
          correctIndex: 0,
        },
        {
          id: 'en-2',
          type: 'multiple-choice',
          prompt: 'Choose the word closest in meaning to “meticulous”.',
          options: ['Careless', 'Careful', 'Hurried', 'Doubtful'],
          correctIndex: 1,
        },
        {
          id: 'en-3',
          type: 'multiple-choice',
          prompt: 'Choose the word most nearly opposite in meaning to “scarce”.',
          options: ['Rare', 'Limited', 'Abundant', 'Costly'],
          correctIndex: 2,
        },
        {
          id: 'en-4',
          type: 'multiple-choice',
          prompt: 'Identify the grammatically correct sentence.',
          options: [
            'Each of the students have submitted the assignment.',
            'Each of the students has submitted the assignment.',
            'Each of the student have submitted the assignment.',
            'Each of the students are submitting the assignment.',
          ],
          correctIndex: 1,
        },
        {
          id: 'en-5',
          type: 'multiple-choice',
          prompt:
            'Remote work reduced commute time, but many employees found that the boundary between work and personal life became less clear. What drawback is mentioned?',
          options: [
            'Longer commutes',
            'Fewer communication tools',
            'Blurred work-life boundaries',
            'Reduced productivity in every role',
          ],
          correctIndex: 2,
        },
        {
          id: 'en-6',
          type: 'multiple-choice',
          prompt: 'She is proficient ___ data analysis.',
          options: ['at', 'in', 'on', 'for'],
          correctIndex: 1,
        },
        {
          id: 'en-7',
          type: 'multiple-choice',
          prompt: 'Choose the correctly spelled word.',
          options: ['Accomodate', 'Acommodate', 'Accommodate', 'Accommadate'],
          correctIndex: 2,
        },
        {
          id: 'en-8',
          type: 'multiple-choice',
          prompt:
            'A policy was announced shortly after an employee survey was completed. Which inference is most reasonable?',
          options: [
            'The survey always caused the policy change.',
            'The survey may have informed the policy decision.',
            'The policy was written by every employee.',
            'The survey had no purpose.',
          ],
          correctIndex: 1,
        },
        {
          id: 'en-9',
          type: 'multiple-choice',
          prompt: 'Choose the best active-voice version of: “The report was reviewed by the manager.”',
          options: [
            'The manager reviewed the report.',
            'The report reviewed the manager.',
            'The manager was reviewed by the report.',
            'Reviewing the report was the manager.',
          ],
          correctIndex: 0,
        },
        {
          id: 'en-10',
          type: 'multiple-choice',
          prompt: 'The delay will ___ the project schedule.',
          options: ['effect', 'affect', 'effective', 'affection'],
          correctIndex: 1,
        },
        {
          id: 'en-11', type: 'multiple-choice',
          prompt: 'Choose the correctly punctuated sentence.',
          options: ['Lets eat, everyone.', "Let's eat, everyone.", "Lets' eat everyone.", 'Lets eat everyone.'],
          correctIndex: 1,
        },
        {
          id: 'en-12', type: 'multiple-choice',
          prompt: 'Choose the word closest in meaning to “concise”.',
          options: ['Brief', 'Confusing', 'Lengthy', 'Uncertain'],
          correctIndex: 0,
        },
        {
          id: 'en-13', type: 'multiple-choice',
          prompt: 'Neither the manager nor the employees ___ available today.',
          options: ['is', 'was', 'are', 'has'],
          correctIndex: 2,
        },
        {
          id: 'en-14', type: 'multiple-choice',
          prompt: 'Choose the correct passive form of “They completed the task.”',
          options: ['The task completed them.', 'The task was completed by them.', 'The task is completing.', 'They were completed by the task.'],
          correctIndex: 1,
        },
        {
          id: 'en-15', type: 'multiple-choice',
          prompt: 'Which sentence is grammatically correct?',
          options: ['She do not like coffee.', 'She does not likes coffee.', 'She does not like coffee.', 'She not like coffee.'],
          correctIndex: 2,
        },
      ],
    },
    {
      id: 'quantitative',
      name: 'Quantitative Ability',
      shortName: 'Quantitative',
      durationMinutes: 15,
      instructions:
        'Solve each problem and select the correct answer. Scratch paper may be used; calculators are not required.',
      questions: [
        {
          id: 'qa-1',
          type: 'multiple-choice',
          prompt: 'What is 20% of 350?',
          options: ['60', '70', '75', '80'],
          correctIndex: 1,
        },
        {
          id: 'qa-2',
          type: 'multiple-choice',
          prompt: 'Two numbers are in the ratio 3:5 and their sum is 64. What is their difference?',
          options: ['8', '12', '16', '24'],
          correctIndex: 2,
        },
        {
          id: 'qa-3',
          type: 'multiple-choice',
          prompt:
            'The average of five numbers is 42. If one number, 30, is removed, what is the average of the remaining numbers?',
          options: ['42', '43', '45', '48'],
          correctIndex: 2,
        },
        {
          id: 'qa-4',
          type: 'multiple-choice',
          prompt: 'An item bought for ₹800 is sold for ₹920. What is the profit percentage?',
          options: ['10%', '12%', '15%', '20%'],
          correctIndex: 2,
        },
        {
          id: 'qa-5',
          type: 'multiple-choice',
          prompt:
            'Pipe A can fill a tank in 12 hours and Pipe B in 18 hours. Working together, how long will they take?',
          options: ['6 hours', '7.2 hours', '8 hours', '9 hours'],
          correctIndex: 1,
        },
        {
          id: 'qa-6',
          type: 'multiple-choice',
          prompt: 'A number is chosen at random from 1 to 20. What is the probability that it is even?',
          options: ['1/4', '1/3', '1/2', '2/3'],
          correctIndex: 2,
        },
        {
          id: 'qa-7',
          type: 'multiple-choice',
          prompt: 'Find the next number in the series: 2, 6, 12, 20, 30, ___',
          options: ['38', '40', '42', '44'],
          correctIndex: 2,
        },
        {
          id: 'qa-8',
          type: 'multiple-choice',
          prompt:
            '₹10,000 is invested at 10% compound interest per year. What is the amount after two years?',
          options: ['₹11,000', '₹12,000', '₹12,100', '₹12,210'],
          correctIndex: 2,
        },
        {
          id: 'qa-9', type: 'multiple-choice',
          prompt: 'A train travels 180 km in 3 hours. What is its average speed?',
          options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'],
          correctIndex: 2,
        },
        {
          id: 'qa-10', type: 'multiple-choice',
          prompt: 'If x + 7 = 19, what is the value of x?',
          options: ['10', '11', '12', '13'],
          correctIndex: 2,
        },
        {
          id: 'qa-11', type: 'multiple-choice',
          prompt: 'A product priced at ₹1,200 has a 25% discount. What is the sale price?',
          options: ['₹800', '₹850', '₹900', '₹950'],
          correctIndex: 2,
        },
        {
          id: 'qa-12', type: 'multiple-choice',
          prompt: 'Find the simple interest on ₹5,000 at 8% per year for 2 years.',
          options: ['₹400', '₹600', '₹800', '₹1,000'],
          correctIndex: 2,
        },
        {
          id: 'qa-13', type: 'multiple-choice',
          prompt: 'If 5 workers finish a job in 12 days, how many days would 10 workers take at the same rate?',
          options: ['4 days', '5 days', '6 days', '8 days'],
          correctIndex: 2,
        },
        {
          id: 'qa-14', type: 'multiple-choice',
          prompt: 'What is the median of 3, 8, 4, 10, and 5?',
          options: ['4', '5', '6', '8'],
          correctIndex: 1,
        },
        {
          id: 'qa-15', type: 'multiple-choice',
          prompt: 'A bag contains 3 red and 2 blue balls. What is the probability of picking a blue ball?',
          options: ['1/5', '2/5', '1/2', '3/5'],
          correctIndex: 1,
        },
      ],
    },
    {
      id: 'logical',
      name: 'Logical Ability',
      shortName: 'Logical',
      durationMinutes: 15,
      instructions:
        'Identify patterns and relationships, then choose the option that follows logically from the information given.',
      questions: [
        {
          id: 'la-1',
          type: 'multiple-choice',
          prompt: 'Complete the series: AZ, BY, CX, DW, ___',
          options: ['EV', 'EU', 'FV', 'DX'],
          correctIndex: 0,
        },
        {
          id: 'la-2',
          type: 'multiple-choice',
          prompt:
            'All engineers are graduates. Some graduates are managers. Which conclusion must be true?',
          options: [
            'All managers are engineers.',
            'Some engineers are managers.',
            'All engineers are graduates.',
            'No graduate is an engineer.',
          ],
          correctIndex: 2,
        },
        {
          id: 'la-3',
          type: 'multiple-choice',
          prompt:
            'In a certain code, CAT is written as DBU. How is DOG written in the same code?',
          options: ['EPH', 'EPG', 'FPH', 'DPH'],
          correctIndex: 0,
        },
        {
          id: 'la-4',
          type: 'multiple-choice',
          prompt:
            'Five colleagues sit in a row. A sits at one end, B sits next to A, and C sits in the middle. Which arrangement is possible?',
          options: ['A-B-C-D-E', 'A-C-B-D-E', 'B-A-C-D-E', 'C-A-B-D-E'],
          correctIndex: 0,
        },
        {
          id: 'la-5',
          type: 'multiple-choice',
          prompt:
            "P is Q's brother. Q is R's mother. How is P related to R?",
          options: ['Father', 'Uncle', 'Brother', 'Grandfather'],
          correctIndex: 1,
        },
        {
          id: 'la-6',
          type: 'multiple-choice',
          prompt: 'Which item is the odd one out?',
          options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
          correctIndex: 1,
        },
        {
          id: 'la-7',
          type: 'multiple-choice',
          prompt:
            'A report states that office attendance improves collaboration. Which assumption is needed for this conclusion?',
          options: [
            'Collaboration cannot happen remotely.',
            'Better collaboration can result from people working together in person.',
            'All employees prefer to work from home.',
            'Attendance is easy to measure.',
          ],
          correctIndex: 1,
        },
        {
          id: 'la-8',
          type: 'multiple-choice',
          prompt: 'Complete the series: 5, 11, 23, 47, ___',
          options: ['83', '91', '95', '99'],
          correctIndex: 2,
        },
        {
          id: 'la-9', type: 'multiple-choice',
          prompt: 'If MOUSE is coded as PRXVH, how is CHAIR coded?',
          options: ['FKDLU', 'FKDLY', 'EKDLU', 'FLDLU'],
          correctIndex: 0,
        },
        {
          id: 'la-10', type: 'multiple-choice',
          prompt: 'A is taller than B. C is shorter than B. D is taller than A. Who is the shortest?',
          options: ['A', 'B', 'C', 'D'],
          correctIndex: 2,
        },
        {
          id: 'la-11', type: 'multiple-choice',
          prompt: 'Find the missing number: 2, 6, 12, 20, 30, ?',
          options: ['40', '42', '44', '48'],
          correctIndex: 1,
        },
        {
          id: 'la-12', type: 'multiple-choice',
          prompt: 'All roses are flowers. Some flowers are red. Which conclusion is valid?',
          options: ['All roses are red.', 'Some roses may be red.', 'No flowers are roses.', 'All red things are roses.'],
          correctIndex: 1,
        },
        {
          id: 'la-13', type: 'multiple-choice',
          prompt: 'If Monday is Day 1, what day is the 45th day?',
          options: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
          correctIndex: 2,
        },
        {
          id: 'la-14', type: 'multiple-choice',
          prompt: 'Which word does NOT belong in the group: Apple, Mango, Carrot, Banana?',
          options: ['Apple', 'Mango', 'Carrot', 'Banana'],
          correctIndex: 2,
        },
        {
          id: 'la-15', type: 'multiple-choice',
          prompt: 'Pointing to a photograph, Amit said "She is the daughter of my grandfather\'s only son." How is the girl related to Amit?',
          options: ['Daughter', 'Sister', 'Mother', 'Cousin'],
          correctIndex: 1,
        },
      ],
    },
    {
      id: 'automata',
      name: 'Automata and Programming Logic',
      shortName: 'Automata',
      durationMinutes: 15,
      instructions:
        'Apply programming logic, state-machine reasoning, and basic computational thinking to each question.',
      questions: [
        {
          id: 'au-1',
          type: 'multiple-choice',
          prompt:
            'A deterministic finite automaton accepts binary strings that end in 01. Which string is accepted?',
          options: ['1010', '1101', '1000', '1111'],
          correctIndex: 1,
        },
        {
          id: 'au-2',
          type: 'multiple-choice',
          prompt:
            'Which string is matched by the regular expression a*b+?',
          options: ['abbb', 'bbaa', 'a', 'ba'],
          correctIndex: 0,
        },
        {
          id: 'au-3',
          type: 'multiple-choice',
          prompt:
            'Which statement about finite automata is correct?',
          options: [
            'DFAs are more expressive than NFAs.',
            'NFAs and DFAs accept the same class of languages.',
            'An NFA cannot be converted to a DFA.',
            'Finite automata can recognize balanced parentheses.',
          ],
          correctIndex: 1,
        },
        {
          id: 'au-4',
          type: 'multiple-choice',
          prompt:
            'What is the final value of sum?\\nsum = 0\\nfor i from 1 to 4:\\n  sum = sum + i',
          options: ['4', '6', '10', '15'],
          correctIndex: 2,
        },
        {
          id: 'au-5',
          type: 'multiple-choice',
          prompt:
            'A recursive function is defined as f(n) = 1 when n <= 1, otherwise n × f(n - 1). What is f(4)?',
          options: ['8', '12', '16', '24'],
          correctIndex: 3,
        },
        {
          id: 'au-6',
          type: 'multiple-choice',
          prompt:
            'What is the time complexity of binary search on a sorted array of n elements?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctIndex: 1,
        },
        {
          id: 'au-7',
          type: 'multiple-choice',
          prompt:
            'Which language cannot be recognized by a finite automaton?',
          options: [
            'Strings ending in a specific symbol',
            'Strings with an even number of ones',
            'Balanced pairs of parentheses',
            'Strings over a fixed alphabet with no consecutive zeros',
          ],
          correctIndex: 2,
        },
        {
          id: 'au-8',
          type: 'multiple-choice',
          prompt:
            'A state machine cycles through states 0, 1, and 2 in order. After 10 transitions starting at 0, which state is active?',
          options: ['0', '1', '2', 'It has no deterministic state'],
          correctIndex: 1,
        },
        {
          id: 'au-9', type: 'multiple-choice',
          prompt: 'What is the output of: x = 5; while x > 0: print(x); x = x - 2',
          options: ['5 3 1', '5 4 3 2 1', '5 3', '4 2 0'],
          correctIndex: 0,
        },
        {
          id: 'au-10', type: 'multiple-choice',
          prompt: 'Which data structure uses FIFO (First In, First Out) ordering?',
          options: ['Stack', 'Queue', 'Binary Tree', 'Hash Map'],
          correctIndex: 1,
        },
        {
          id: 'au-11', type: 'multiple-choice',
          prompt: 'What is the worst-case time complexity of linear search?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctIndex: 2,
        },
        {
          id: 'au-12', type: 'multiple-choice',
          prompt: 'A push-down automaton differs from a finite automaton because it has:',
          options: ['Multiple start states', 'A stack memory', 'No transitions', 'Only one state'],
          correctIndex: 1,
        },
        {
          id: 'au-13', type: 'multiple-choice',
          prompt: 'What does the following return? function f(n) { if (n <= 1) return n; return f(n-1) + f(n-2); } f(6)',
          options: ['5', '8', '11', '13'],
          correctIndex: 1,
        },
        {
          id: 'au-14', type: 'multiple-choice',
          prompt: 'Which of the following is a context-free language?',
          options: ['a^n b^n (n ≥ 0)', 'a^n b^n c^n', 'Strings with equal a, b, c counts', 'None of the above'],
          correctIndex: 0,
        },
        {
          id: 'au-15', type: 'multiple-choice',
          prompt: 'What is the output of: for i in range(3): for j in range(2): print(i+j, end=" ")',
          options: ['0 1 1 2 2 3', '0 1 2 3 4 5', '0 0 1 1 2 2', '1 2 2 3 3 4'],
          correctIndex: 0,
        },
      ],
    },
    {
      id: 'cs',
      name: 'Computer Science Fundamentals',
      shortName: 'CS Fundamentals',
      durationMinutes: 15,
      instructions:
        'Answer questions covering core computer science concepts, data structures, databases, and networks.',
      questions: [
        {
          id: 'cs-1',
          type: 'multiple-choice',
          prompt: 'Which of these is not a core principle of object-oriented programming?',
          options: ['Encapsulation', 'Inheritance', 'Normalization', 'Polymorphism'],
          correctIndex: 2,
        },
        {
          id: 'cs-2',
          type: 'multiple-choice',
          prompt: 'What is the primary purpose of a primary key in a relational database?',
          options: [
            'To sort every table',
            'To uniquely identify each row',
            'To store only numeric values',
            'To connect the database to a network',
          ],
          correctIndex: 1,
        },
        {
          id: 'cs-3',
          type: 'multiple-choice',
          prompt: 'What does SELECT COUNT(*) FROM employees return?',
          options: [
            'The number of columns in employees',
            'The number of rows in employees',
            'The sum of all employee salaries',
            'The names of all employees',
          ],
          correctIndex: 1,
        },
        {
          id: 'cs-4',
          type: 'multiple-choice',
          prompt: 'Which statement about threads within the same process is correct?',
          options: [
            'Each thread has a completely separate memory space.',
            'Threads share the process memory space.',
            'Threads cannot communicate with each other.',
            'A process can contain only one thread.',
          ],
          correctIndex: 1,
        },
        {
          id: 'cs-5',
          type: 'multiple-choice',
          prompt: 'Which protocol is connection-oriented?',
          options: ['UDP', 'TCP', 'ICMP', 'ARP'],
          correctIndex: 1,
        },
        {
          id: 'cs-6',
          type: 'multiple-choice',
          prompt: 'A stack follows which access order?',
          options: ['First in, first out', 'Last in, first out', 'Random access', 'Priority order'],
          correctIndex: 1,
        },
        {
          id: 'cs-7',
          type: 'multiple-choice',
          prompt: 'Before binary search can be used, the input array must be:',
          options: ['Empty', 'Sorted', 'Stored in a linked list', 'Free of duplicates'],
          correctIndex: 1,
        },
        {
          id: 'cs-8',
          type: 'multiple-choice',
          prompt: 'Which HTTP response status code means “Not Found”?',
          options: ['200', '301', '404', '500'],
          correctIndex: 2,
        },
      ],
    },
    {
      id: 'coding',
      name: 'Coding Practice',
      shortName: 'Coding',
      durationMinutes: 15,
      instructions:
        'Read each code-oriented problem, reason about the expected behaviour, and choose the best answer.',
      questions: [
        {
          id: 'co-1',
          type: 'multiple-choice',
          prompt:
            'What does this function return for reverse("hello")?\\nfunction reverse(s) {\\n  return s.split("").reverse().join("");\\n}',
          options: ['hello', 'olleh', 'h', 'undefined'],
          correctIndex: 1,
        },
        {
          id: 'co-2',
          type: 'multiple-choice',
          prompt:
            'Which change fixes the off-by-one error?\\nfor (let i = 0; i <= items.length; i++) {\\n  process(items[i]);\\n}',
          options: [
            'Change i = 0 to i = 1',
            'Change i <= items.length to i < items.length',
            'Remove the increment',
            'Change items.length to items.length - 2',
          ],
          correctIndex: 1,
        },
        {
          id: 'co-3',
          type: 'multiple-choice',
          prompt: 'What does the expression x & 1 determine about a non-negative integer x?',
          options: [
            'Whether x is positive',
            'Whether x is even or odd',
            'Whether x is prime',
            'Whether x is a perfect square',
          ],
          correctIndex: 1,
        },
        {
          id: 'co-4',
          type: 'multiple-choice',
          prompt: 'What is the result of [1, 2, 3].map(n => n * n)?',
          options: ['[1, 2, 3]', '[1, 4, 9]', '[2, 4, 6]', '[1, 4, 6]'],
          correctIndex: 1,
        },
        {
          id: 'co-5',
          type: 'multiple-choice',
          prompt:
            'Which algorithm is most appropriate for finding the shortest path in an unweighted graph?',
          options: ['Depth-first search', 'Breadth-first search', 'Bubble sort', 'Binary search'],
          correctIndex: 1,
        },
        {
          id: 'co-6',
          type: 'multiple-choice',
          prompt:
            'A function is supposed to return the larger of two numbers. Which implementation is correct?',
          options: [
            'return a < b ? a : b;',
            'return a > b ? a : b;',
            'return a === b ? a : a + b;',
            'return b;',
          ],
          correctIndex: 1,
        },
        {
          id: 'co-7', type: 'multiple-choice',
          prompt: 'What is the output of: console.log(typeof null)',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          correctIndex: 2,
        },
        {
          id: 'co-8', type: 'multiple-choice',
          prompt: 'Which sorting algorithm has the best average-case time complexity?',
          options: ['Bubble Sort – O(n²)', 'Merge Sort – O(n log n)', 'Selection Sort – O(n²)', 'Insertion Sort – O(n²)'],
          correctIndex: 1,
        },
        {
          id: 'co-9', type: 'multiple-choice',
          prompt: 'What does the following code print? let a = [1,2,3]; a.push(4); console.log(a.length)',
          options: ['3', '4', '5', 'undefined'],
          correctIndex: 1,
        },
        {
          id: 'co-10', type: 'multiple-choice',
          prompt: 'In Python, what does "list comprehension" refer to?',
          options: ['A way to delete lists', 'A concise way to create lists', 'A method to sort lists', 'A type of linked list'],
          correctIndex: 1,
        },
        {
          id: 'co-11', type: 'multiple-choice',
          prompt: 'What is the output of: print(2 ** 3 ** 2) in Python?',
          options: ['64', '512', '36', '81'],
          correctIndex: 1,
        },
        {
          id: 'co-12', type: 'multiple-choice',
          prompt: 'Which keyword is used to handle exceptions in Python?',
          options: ['catch', 'except', 'handle', 'error'],
          correctIndex: 1,
        },
        {
          id: 'co-13', type: 'multiple-choice',
          prompt: 'What does git commit do?',
          options: ['Uploads code to remote', 'Saves staged changes to local repository', 'Deletes a branch', 'Merges two branches'],
          correctIndex: 1,
        },
        {
          id: 'co-14', type: 'multiple-choice',
          prompt: 'What is the space complexity of a hash map with n elements?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          correctIndex: 2,
        },
        {
          id: 'co-15', type: 'multiple-choice',
          prompt: 'What does the following return? [1, 2, 3].filter(x => x > 1).reduce((a, b) => a + b, 0)',
          options: ['3', '5', '6', '1'],
          correctIndex: 1,
        },
      ],
    },
  ],
};

export const getSection = (sectionId) =>
  assessmentConfig.sections.find((section) => section.id === sectionId);

export const getSectionIndex = (sectionId) =>
  assessmentConfig.sections.findIndex((section) => section.id === sectionId);

export const totalQuestionCount = assessmentConfig.sections.reduce(
  (total, section) => total + section.questions.length,
  0,
);
