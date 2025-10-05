function precedence(op) {
  switch (op) {
    case '+': case '-': return 1;
    case '*': case '/': case '%': return 2;
    case '^': return 3;
    default: return 0;
  }
}

function isOperator(c) {
  return ['+', '-', '*', '/', '%', '^'].includes(c);
}

function isOperand(c) {
  return /^[a-zA-Z0-9]$/.test(c);
}

function isRightAssociative(c){
  return c==='^';
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function swapBrackets(exp) {
  return exp.split('').map(c => c === '(' ? ')' : c === ')' ? '(' : c).join('');
}

function logStep(step, char, stack, output) {
  const tbody = document.querySelector("#stepsTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${step}</td><td>${char}</td><td>${stack.join('')}</td><td>${output}</td>`;
  tbody.appendChild(row);
}

function clearTable() {
  document.querySelector("#stepsTable tbody").innerHTML = "";
}

function infixToPostfixWithSteps(infix) {
  let stack = [];
  let postfix = '';
  let step = 1;
  clearTable();

  for (let ch of infix) {
    if (isOperand(ch)) {
      postfix += ch;
    } else if (ch === '(') {
      stack.push(ch);
    } else if (ch === ')') {
      while (stack.length && stack[stack.length - 1] !== '(')
        postfix += stack.pop();
      stack.pop(); // remove '('
    } else if (isOperator(ch)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        precedence(stack[stack.length - 1]) >= precedence(ch) &&
        !isRightAssociative(ch)
      ) {
        postfix += stack.pop();
      }
      stack.push(ch);
    }
    logStep(step++, ch, stack, postfix);
  }

  while (stack.length) {
    postfix += stack.pop();
    logStep(step++, '', stack, postfix);
  }

  return postfix;
}

function infixToPrefixWithSteps(infix) {
  let reversed = reverse(infix);
  reversed = swapBrackets(reversed);
  let postfix = infixToPostfixWithSteps(reversed);
  return reverse(postfix);
}

function convertToPostfix() {
  const infix = document.getElementById("infixInput").value.replace(/\s+/g, '');
  if (!infix) return;
  const result = infixToPostfixWithSteps(infix);
  document.getElementById("result").textContent = "Postfix: " + result;
}

function convertToPrefix() {
  const infix = document.getElementById("infixInput").value.replace(/\s+/g, '');
  if (!infix) return;
  const result = infixToPrefixWithSteps(infix);
  document.getElementById("result").textContent = "Prefix: " + result;
}