package udb.gl.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ChangePassword {

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;


    public ChangePassword(String password, String username) {
        this.password = password;

    }



    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
