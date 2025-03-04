import Form from "next/form";

export default function Access() {
  return (
    /* add action prop to initiate a route */
    <Form className="rounded-xl border-2 px-2 py-2">
      {/* On submission, the input value will be appended to
          the URL, e.g. /search?query=abc */}
      <input name="query" />
      <button type="submit">Submit</button>
    </Form>
  );
}
