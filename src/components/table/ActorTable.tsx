import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import { Actor } from "types/Actor";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  getActors,
  editActor,
  createActor,
  deleteActor,
} from "store/slices/actor";
import { DialogTitleProps } from "types/Modal";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const ActorTable = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.actors.data as Actor[]);
  const [actor, setActor] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    age: 0,
    image_link: "",
  });
  const [trigger, setTrigger] = React.useState(false as Boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  useEffect(() => {
    dispatch(getActors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  const handleClickOpen = async (value: Number, option: any) => {
    let tempActor: any = actors.find((actor) => actor.id === value.toString());
    console.log(tempActor);
    setActor(tempActor);
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editActor(actor));
    setTrigger(!trigger);
    handleClose();
  };

  const handleDeleteSubmit = () => {
    dispatch(deleteActor(actor));
    setTrigger(!trigger);
    handleClose();
  };

  const handleAddSubmit = () => {
    dispatch(createActor(actor));
    setTrigger(!trigger);
    handleClose();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value =
      name === "age" ? parseInt(event.target.value) : event.target.value;

    setActor({ ...actor, [name]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setActor({ ...actor, gender: event.target.value });
  };

  const columns = [
    {
      name: "image_link",
      label: "Avatar",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: String) => {
          return (
            <>
              <Avatar src={`${value}`} />
            </>
          );
        },
      },
    },

    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
        // customBodyRender: (value: String, rowData: any) => {
        //   return `${value} ${rowData.tableData[0][1]}`;
        // },
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: { filter: true, sort: true },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "age",
      label: "Age",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: number) => {
          return (
            <>
              <Button onClick={() => handleClickOpen(value, "edit")}>
                Edit
              </Button>
              <Button onClick={() => handleClickOpen(value, "delete")}>
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

  const options: MUIDataTableOptions = {
    selectableRows: "none",
    filterType: "checkbox",
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <MUIDataTable
              title={
                <Box>
                  <IconButton onClick={() => setOpen({ ...open, add: true })}>
                    <Tooltip title="Add an actor">
                      <AddIcon
                        sx={{ color: "white", fontSize: { xs: 14, sm: 28 } }}
                      />
                    </Tooltip>
                  </IconButton>
                  Actors List
                </Box>
              }
              data={actors}
              columns={columns}
              options={options}
            />
          </TableContainer>
        </Paper>
      </Box>

      <Dialog
        open={open.delete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this User?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDeleteSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open.add || open.edit}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {open.add ? `Create an Actor` : `Edit an Actor`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={actor.firstName}
                  onChange={changeHandler}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={changeHandler}
                  value={actor.lastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ minWidth: 268 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Account Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Account Status"
                    name="account_status"
                    onChange={handleChange}
                    value={actor.gender.toString()}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  onChange={changeHandler}
                  value={actor.age}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="image_link"
                  label="Image Link"
                  type="text"
                  value={actor.image_link}
                  onChange={changeHandler}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={open.add ? handleAddSubmit : handleEditSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
