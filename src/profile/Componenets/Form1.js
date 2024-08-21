import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const Form1 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[24px] text-left text-xs text-neutral-04-100 font-hairline-2 ${className}`}
    >
      <div className="relative text-xl leading-[32px] font-semibold text-black inline-block min-w-[95px] mq450:text-base mq450:leading-[26px]">
        Password
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
        <b className="relative leading-[12px] uppercase inline-block min-w-[97px]">
          Old password
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="Old password"
          variant="outlined"
          sx={{
            "& fieldset": { borderColor: "#cbcbcb" },
            "& .MuiInputBase-root": {
              height: "40px",
              backgroundColor: "#fff",
              borderRadius: "6px",
            },
            "& .MuiInputBase-input": { color: "#6c7275" },
          }}
        />
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
        <b className="relative leading-[12px] uppercase inline-block min-w-[101px]">
          new password
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="New password"
          variant="outlined"
          sx={{
            "& fieldset": { borderColor: "#cbcbcb" },
            "& .MuiInputBase-root": {
              height: "40px",
              backgroundColor: "#fff",
              borderRadius: "6px",
            },
            "& .MuiInputBase-input": { color: "#6c7275" },
          }}
        />
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
        <b className="relative leading-[12px] uppercase">rEPEAT NEW PASSWORD</b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="Repeat new password"
          variant="outlined"
          sx={{
            "& fieldset": { borderColor: "#cbcbcb" },
            "& .MuiInputBase-root": {
              height: "40px",
              backgroundColor: "#fff",
              borderRadius: "6px",
            },
            "& .MuiInputBase-input": { color: "#6c7275" },
          }}
        />
      </div>
      <Button
        className="w-[183px] h-[52px]"
        disableElevation
        variant="contained"
        sx={{
          textTransform: "none",
          color: "#fff",
          fontSize: "16",
          background: "#141718",
          borderRadius: "8px",
          "&:hover": { background: "#141718" },
          width: 183,
          height: 52,
        }}
      >
        Save changes
      </Button>
    </div>
  );
};

Form1.propTypes = {
  className: PropTypes.string,
};

export default Form1;
