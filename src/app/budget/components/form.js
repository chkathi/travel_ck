import Form from "next/form";

export default function BudgetForm() {
  return (
    <Form>
      <input placeholder="expense_name" className="border-4 border-white-50" />
      <input placeholder="expense_type" className="border-4 border-white-50" />
      <input placeholder="cost" className="border-4 border-white-50" />
      <input
        placeholder="notes_optional"
        className="border-4 border-white-50"
      />
      <button> Add Expense </button>
    </Form>
  );
}
