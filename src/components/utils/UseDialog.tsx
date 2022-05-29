import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type DialogProps = {
    setElement: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

function UseDialog({ setElement, children }: DialogProps) {
    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            onClose={() => setElement(false)}
            maxWidth="xl"
        >
            <DialogContent style={{ padding: 0 }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default UseDialog