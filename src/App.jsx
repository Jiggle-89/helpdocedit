import { useState, useEffect } from 'react'
import '@mdxeditor/editor/style.css'
import './mdxeditor.css'
import { MDXEditor } from '@mdxeditor/editor/MDXEditor'
import { UndoRedo } from '@mdxeditor/editor/plugins/toolbar/components/UndoRedo'
import { BoldItalicUnderlineToggles } from '@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles'
import { InsertTable } from '@mdxeditor/editor/plugins/toolbar/components/InsertTable'
import { BlockTypeSelect } from '@mdxeditor/editor/plugins/toolbar/components/BlockTypeSelect'
import { toolbarPlugin } from '@mdxeditor/editor/plugins/toolbar'
import { tablePlugin } from '@mdxeditor/editor'
import { headingsPlugin } from '@mdxeditor/editor/plugins/headings'
import { listsPlugin } from '@mdxeditor/editor/plugins/lists'
import { thematicBreakPlugin } from '@mdxeditor/editor'
import { markdownShortcutPlugin } from '@mdxeditor/editor'

function App() {
  const [markdown, setMarkdown] = useState(null)
  
  function markdownChange(markdown) {
    setMarkdown(markdown)
  }

  function escapeHtmlTags(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://toardocs.vercel.app/index.mdx');
      const data = await response.text();
      setMarkdown(escapeHtmlTags(data));
    };

    fetchData();
  }, []);

  if (markdown == null) {
    return <div>Loading...</div>
  }

  return (
    <MDXEditor markdown={markdown} 
      plugins={[toolbarPlugin({
        toolbarContents: () => ( <> <UndoRedo />  <BlockTypeSelect /> <BoldItalicUnderlineToggles />   <InsertTable />    </>)
      }),

      tablePlugin(),
      headingsPlugin(),
      listsPlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin()]}

      className="mdxeditor"
      onChange={markdownChange}
    />
  )
}

export default App
