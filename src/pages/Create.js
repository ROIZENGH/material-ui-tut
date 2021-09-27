import React, { useState } from "react";
import { Typography, Button, Container, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
	field:{
		marginTop: 20,
		marginBottom: 20,
		display: "block"
	}
})


export default function Create() {
	
	const [title, setTitle] = useState("")
	const [details, setDetails] = useState("")
	const [titleError, setTitleError] = useState(false)
	const [detailsError, setDetailsError] = useState(false)
	const handleSubmit = (e) => {
		e.preventDefault()
		setTitleError(false);
		setDetailsError(false);
		if(title == ""){
			setTitleError(true);
		}
		if(details == ""){
			setDetailsError(true);
		}

		if(title && details){
			console.log(title, details)
		}
	}
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
					onChange={(e)=> setTitle(e.target.value)}
					variant="outlined"
					label="Note Title"
					color="secondary"
					fullWidth
					required
					error={titleError}
				/>
				<TextField 
					className={classes.field}
					onChange={(e)=> setDetails(e.target.value)}
					variant="outlined"
					label="Details"
					color="secondary"
					multiline
					rows={4}
					fullWidth
					required
					error={detailsError}
				/>
				<Button
					type="submit"
					color="secondary"
					variant="contained"
					endIcon={<KeyboardArrowRightIcon />}
				> Submit </Button>
			</form>
		</Container>
	);
}
