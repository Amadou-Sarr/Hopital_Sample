package udb.gl.payload;

import java.time.Instant;

public class ProfilUtilisateur {

    private long id;
    private String nom;
    private String prenom;
    private String username;
    private String matricule;
    private Instant joignedAt;

    public ProfilUtilisateur(long id, String nom, String prenom, String username,String matricule, Instant joignedAt) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.username = username;
        this.matricule = matricule;
        this.joignedAt = joignedAt;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Instant getJoignedAt() {
        return joignedAt;
    }

    public void setJoignedAt(Instant joignedAt) {
        this.joignedAt = joignedAt;
    }

}
