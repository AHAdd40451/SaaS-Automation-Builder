import { useModal } from '@/providers/modal-providers'
import React from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '../ui/drawer'
import { Button } from '../ui/button'

type Props = {
    title: string,
    subHeading: string,
    children: React.ReactNode,
    defaultOpen?: boolean

}

const customModal = ({ children, title, subHeading, defaultOpen }: Props) => {

    const { isOpen, setClose } = useModal()

    const HandleClose = () => setClose()
    return (
        <Drawer open={isOpen} onClose={HandleClose}>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription className="text-center flex flex-col items-center gap-4 h-86 overflow-scroll">
                        {subHeading}
                        {children}
                    </DrawerDescription>

                </DrawerHeader>

                <DrawerFooter className='flex flex-col gap-4 bg-background border-t-[1px] border-t-muted'>
                    <DrawerClose>
                        <Button variant="ghost" className='w-full' onClick={HandleClose}>
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default customModal