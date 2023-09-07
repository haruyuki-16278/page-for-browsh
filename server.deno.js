import { serve } from "https://deno.land/std@0.151.0/http/server.ts";
// import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  console.log(url.href);

  if (url.pathname === '/') {
    if(req.method === 'GET') {
      const preparedHTML = await Deno.readTextFile(
        new URL('./public/index.html', import.meta.url)
      );
      const tasks = ['task1', 'task2', 'task3'];
      const renderedHTML = preparedHTML.replace('{{anchor-todo-list}}',
        (() => {
          let taskHTML = '';
          tasks.forEach(task => taskHTML += '<li>' + task + '</li>');
          return taskHTML;
        })()
      );
      return new Response(
        renderedHTML, {
          status: 200,
          headers: {
            'content-type': 'text/html',
          }
        }
      );
    }
  }

  return new Response('not found', {status: 404});
});
