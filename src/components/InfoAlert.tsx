import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Link,
  Box,
} from "@mui/material";
import donate from "assets/img/donate.gif";
import { version } from "../../package.json";

const gitSHA = import.meta.env.VITE_GIT_SHA || "development";

type Props = {
  isOpen: boolean;
  onDidDismiss(): void;
};

export default function InfoAlert({ isOpen, onDidDismiss }: Props) {
  return (
    <Dialog open={isOpen} onClose={onDidDismiss}>
      <DialogTitle>About B%C</DialogTitle>
      <DialogContent>
        <DialogContentText component="div" textAlign="center">
          <Typography>
            <strong>Version</strong>: {version} ({gitSHA.substring(0, 7)})
          </Typography>
          <Typography>
            <Link href="mailto:panificazionefavaglie@gmail.com?subject=BakerCalc">
              Info mail
            </Link>
          </Typography>
          <Typography>
            If you like the App
            <br />
            support me with a beer!
            <br />
            Thank you
          </Typography>
          <Box mt={2}>
            <a href="https://www.paypal.com/ncp/payment/MW65J8LXXJ8S4">
              <img src={donate} alt="Donate" />
            </a>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
