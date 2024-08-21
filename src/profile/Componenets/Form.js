import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";
import PropTypes from "prop-types";

const Form = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left text-xs text-neutral-04-100 font-hairline-2 ${className}`}
    >
      <div className="relative text-xl leading-[32px] font-semibold text-black mq450:text-base mq450:leading-[26px]">
        Account Details
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
        <b className="relative leading-[12px] uppercase inline-block min-w-[83px]">
          First name *
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="First name"
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
        <b className="relative leading-[12px] uppercase inline-block min-w-[81px]">
          last name *
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="Last name"
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
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px] max-w-full">
        <b className="w-[134.9px] relative leading-[12px] uppercase inline-block">
          Display name *
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="Display name"
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
        <i className="relative leading-[20px] inline-block max-w-full">
          This will be how your name will be displayed in the account section
          and in reviews
        </i>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
        <b className="relative leading-[12px] uppercase inline-block min-w-[48px]">
          Email *
        </b>
        <TextField
          className="[border:none] bg-[transparent] self-stretch h-10 font-hairline-2 text-base text-neutral-04-100"
          placeholder="Email"
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
    </div>
  );
};

Form.propTypes = {
  className: PropTypes.string,
};

export default Form;
