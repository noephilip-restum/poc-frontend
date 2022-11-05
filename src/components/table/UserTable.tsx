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
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { User } from "types/User";
import { DialogTitleProps } from "types/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { getUsers, editUser } from "store/slices/user";

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

export const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.data as User[]);
  const [currentUser, setCurrentUser] = React.useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    account_role: "",
    account_status: "",
  });
  const [trigger, setTrigger] = React.useState(false as Boolean);
  const [open, setOpen] = React.useState({
    edit: false,
    delete: false,
    add: false,
  });

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, trigger]);

  const handleClickOpen = async (value: Number, option: any) => {
    let tempUser: any = users.find((user) => user._id === value.toString());
    setCurrentUser(tempUser);
    setOpen({ ...open, [option]: true });
  };

  const handleClose = () => {
    setOpen({ delete: false, edit: false, add: false });
  };

  const handleEditSubmit = () => {
    dispatch(editUser(currentUser));
    setTrigger(!trigger);
    handleClose();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentUser({ ...currentUser, account_status: event.target.value });
  };

  const columns = [
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
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "account_status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: String) => {
          return (
            <>
              {value.toLocaleLowerCase() === "pending" ? (
                <Chip label={value.toLocaleUpperCase()} color="primary" />
              ) : value.toLocaleLowerCase() === "active" ? (
                <Chip label={value.toLocaleUpperCase()} color="success" />
              ) : (
                <Chip label={value.toLocaleUpperCase()} color="error" />
              )}
            </>
          );
        },
      },
    },
    {
      name: "account_role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: String) => {
          return (
            <>
              <Chip label={value} variant="outlined" />
            </>
          );
        },
      },
    },

    {
      name: "_id",
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
                  Users List
                </Box>
              }
              data={users}
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
          <Button onClick={handleClose} autoFocus>
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
          {open.add ? `Create User` : `Edit User`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  value={currentUser.firstName}
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
                  value={currentUser.lastName}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={changeHandler}
                  value={currentUser.email}
                  autoComplete="email"
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
                    value={currentUser.account_status}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Reject"}>Reject</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  disabled
                  label="Account Type"
                  name="account_type"
                  onChange={changeHandler}
                  value={currentUser.account_role}
                />
              </Grid>
              {open.add && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleEditSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};
