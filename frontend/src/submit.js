export async function submitPipeline(nodes, edges) {
  const response = await fetch("https://pipeline-workflow.onrender.com/pipelines/parse", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nodes, edges }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}