package udb.gl.payload;

public class UtilisateurSummary {

        private Long id;
        private String username;
        private String prenom;

    public UtilisateurSummary(Long id, String username, String prenom) {
        this.id = id;
        this.username = username;
        this.prenom = prenom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
}
