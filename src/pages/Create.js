import React, { useState } from "react";
import {
	Typography,
	Button,
	Container,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
	FormControl,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: "block",
	},
});

export default function Create() {
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState("money");

	const history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);
		if (title == "") {
			setTitleError(true);
		}
		if (details == "") {
			setDetailsError(true);
		}

		if (title && details) {
			console.log(title, details, category);
			fetch("http://localhost:8000/notes", {
				method: "POST",
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({title, details, category})
			}).then(()=> history.push("/"))
		}
	};
	const classes = useStyles();

	return (
		<Container>
			<Typography
				variant="h6"
				color="textSecondary"
				component="h2"
				gutterBottom
			>
				Create a New Note
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					className={classes.field}
					onChange={(e) => setTitle(e.target.value)}
					variant="outlined"
					label="Note Title"
					color="secondary"
					fullWidth
					required
					error={titleError}
				/>
				<TextField
					className={classes.field}
					onChange={(e) => setDetails(e.target.value)}
					variant="outlined"
					label="Details"
					color="secondary"
					multiline
					rows={4}
					fullWidth
					required
					error={detailsError}
				/>
				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<FormControlLabel control={<Radio />} label="Money" value="money" />
						<FormControlLabel control={<Radio />} label="Todos" value="todos" />
						<FormControlLabel
							control={<Radio />}
							label="Remineder"
							value="reminders"
						/>
						<FormControlLabel control={<Radio />} label="Work" value="work" />
					</RadioGroup>
				</FormControl>
				<Button
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<KeyboardArrowRightIcon />}
				>
					{" "}
					Submit{" "}
				</Button>
			</form>
		</Container>
	);
}
