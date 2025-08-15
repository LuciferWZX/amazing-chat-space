import type { ReactNode, RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useShallow } from 'zustand/shallow'
import { Mask, Portal } from '@/components'
import ExpandDrawerToolbar from '@/core/expand-bottom-drawer/toolbar.tsx'
import { useEditorStore } from '@/stores/use-editor-store.ts'

interface ExpandBottomDrawerProps {
  instanceId: string
  children?: ReactNode
  containerRef?: RefObject<HTMLElement | null>
}
function ExpandBottomDrawer(props: ExpandBottomDrawerProps) {
  const { instanceId, children, containerRef } = props
  const ref = useRef<HTMLDivElement | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)
  const { isExpand, setInstanceProps } = useEditorStore(
    useShallow((state) => {
      return {
        isExpand: state.instances.get(instanceId)?.isExpand,
        setInstanceProps: state.setInstanceProps,
      }
    }),
  )
  useGSAP(
    () => {
      if (isExpand) {
        // 创建timeline来确保动画顺序
        const tl = gsap.timeline()

        // 先执行mask的动画
        tl.to(maskRef.current, {
          height: '100%',
          duration: 0.3,
          ease: 'power2.inOut',
          opacity: 1,
        })

        // 然后执行ref的动画
        tl.to(
          ref.current,
          {
            height: '80%',
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '-=0.1',
        ) // 稍微重叠一点，让动画更流畅
      }
      else {
        // 关闭动画：先收起内容区域，再收起mask
        const tl = gsap.timeline()

        // 先执行ref的收起动画
        tl.to(ref.current, {
          height: '0',
          duration: 0.3,
          ease: 'power2.inOut',
        })

        // 然后执行mask的收起动画
        tl.to(maskRef.current, {
          height: '0',
          duration: 0.3,
          ease: 'power2.inOut',
          opacity: 0,
        }) // 稍微重叠一点，让动画更流畅
      }
    },
    { scope: ref, dependencies: [isExpand] },
  )
  return (
    <Portal container={containerRef?.current ?? undefined}>
      <Mask
        onClick={() => {
          setInstanceProps(instanceId, { isExpand: false })
        }}
        className="h-0 opacity-0 overflow-hidden"
        ref={maskRef}
      >
        <div
          ref={ref}
          onClick={(evt) => {
            evt.stopPropagation()
          }}
          className="absolute z-51 bottom-0 left-0 right-0 h-0 bg-background border rounded-t-xl shadow-lg"
        >
          <div className="pt-2.5 h-full flex flex-col">
            <div className="pb-3 px-2">
              <ExpandDrawerToolbar instanceId={instanceId} />
            </div>
            {children}
          </div>
        </div>
      </Mask>
    </Portal>
  )
}
export default ExpandBottomDrawer
