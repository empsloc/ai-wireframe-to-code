import React from "react";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import Constants from "@/data/Constants";
import { aquaBlue } from "@codesandbox/sandpack-themes";

function CodeEditor({ codeResp, readyForDB }: any) {
  return (
    <div className="h-full bg--900 ">
      {readyForDB ? (
        
        <Sandpack
          template="react"
          theme={aquaBlue}
          
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: 900
            
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          files={{"/App.js":{code:`${codeResp}`}}}
        />
        

      ) :<div>Loading your code</div>}
    </div>
  );
}

export default CodeEditor;
