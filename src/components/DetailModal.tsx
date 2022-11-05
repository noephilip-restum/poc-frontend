import { forwardRef, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import QualityChip from "./QualityChip";
import { useDetailModal } from "providers/DetailModalProvider";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// interface DetailModalProps {
//   detail: MovieDetail | null;
//   similarVideos: Movie[];
//   onClose: VoidFunction;
// }

export default function DetailModal() {
  const [value, setValue] = useState<number | null>(2);
  const { detail, onClose } = useDetailModal();

  return (
    <Dialog
      id="detail_dialog"
      fullWidth
      scroll="body"
      maxWidth="md"
      open={detail !== null}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: "relative",
              paddingTop: "calc(9 / 16 * 100%)",
            }}
          >
            <Box
              component="img"
              src={`https://www.themoviedb.org/t/p/original/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
              }}
            />

            <Box
              sx={{
                background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                top: 0,
                left: 0,
                bottom: 0,
                right: "26.09%",
                opacity: 1,
                position: "absolute",
                transition: "opacity .5s",
              }}
            />
            <Box
              sx={{
                backgroundColor: "transparent",
                backgroundImage:
                  "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0px top",
                backgroundSize: "100% 100%",
                bottom: 0,
                position: "absolute",
                height: "14.7vw",
                opacity: 1,
                top: "auto",
                width: "100%",
              }}
            />
            <IconButton
              onClick={onClose}
              sx={{
                top: 15,
                right: 15,
                position: "absolute",
                bgcolor: "#181818",
                width: { xs: 22, sm: 40 },
                height: { xs: 22, sm: 40 },
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <CloseIcon
                sx={{ color: "white", fontSize: { xs: 14, sm: 22 } }}
              />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 16,
                px: { xs: 2, sm: 3, md: 5 },
              }}
            >
              <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                Black Adam
              </MaxLineTypography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <PlayButton sx={{ color: "black", py: 0 }} />

                <Box flexGrow={1} />
              </Stack>

              <Container
                sx={{
                  p: "0px !important",
                }}
              >
                <Grid container spacing={5} alignItems="center">
                  <Grid item xs={12} sm={6} md={8}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Rating name="simple-controlled" value={value} disabled />
                      <Typography variant="body2">2022</Typography>
                      <QualityChip label="HD" />
                    </Stack>
                    <MaxLineTypography
                      maxLine={3}
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      Nearly 5,000 years after he was bestowed with the almighty
                      powers of the Egyptian gods—and imprisoned just as
                      quickly—Black Adam is freed from his earthly tomb, ready
                      to unleash his unique form of justice on the modern world.
                    </MaxLineTypography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>

          <Container
            sx={{
              py: 2,
              px: { xs: 2, sm: 3, md: 5 },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Actors
            </Typography>
            <Grid container>
              <Tooltip title="Tom Holland">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg"
                  }
                  sx={{ height: "90px", width: "90px", marginRight: "30px" }}
                />
              </Tooltip>
              <Tooltip title="Tom Holland">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg"
                  }
                  sx={{ height: "90px", width: "90px", marginRight: "30px" }}
                />
              </Tooltip>
              <Tooltip title="Tom Holland">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/bBRlrpJm9XkNSg0YT5LCaxqoFMX.jpg"
                  }
                  sx={{ height: "90px", width: "90px", marginRight: "30px" }}
                />
              </Tooltip>
            </Grid>
          </Container>
          <Container
            sx={{
              py: 2,
              px: { xs: 2, sm: 3, md: 5 },
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Reviews
            </Typography>
            <Grid container>
              <Card
                sx={{
                  maxWidth: 360,
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="December 21, 2022"
                  subheader={
                    <Rating name="simple-controlled" value={value} disabled />
                  }
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 360,
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="December 21, 2022"
                  subheader={
                    <Rating name="simple-controlled" value={value} disabled />
                  }
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 360,
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="December 21, 2022"
                  subheader={
                    <Rating name="simple-controlled" value={value} disabled />
                  }
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  maxWidth: 360,
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="December 21, 2022"
                  subheader={
                    <Rating name="simple-controlled" value={value} disabled />
                  }
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
