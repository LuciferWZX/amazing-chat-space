import type { Editor } from "slate";
type ConsumeFunc=((editor:Editor)=>Editor)
type ConsumePlugin = ConsumeFunc[]
export function consumePlugins(pluginConsumer:Editor,plugins:ConsumePlugin){
    let out = pluginConsumer
    plugins.forEach(plugin=>{
        out = procceedPlugins(out,plugin)
    })
    return out
}
function procceedPlugins(editor:Editor,curEditor:ConsumeFunc){
    return curEditor(editor)
}