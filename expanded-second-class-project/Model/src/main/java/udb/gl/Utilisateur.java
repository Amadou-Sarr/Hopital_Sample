package udb.gl;

import udb.gl.audit.DateAudit;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Utilisateur extends DateAudit {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length =100)
    private String nom;

    @Column(length =100)
    private String prenom;

    @Column(length =100)
    private String password;

    @Column(length =100)
    private String username;

    @Column(length =100)
    private String photo;

    @Column(length =100)
    private String matricule;

    @Column(length =100)
    private String email;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST )//CascadeType.Persit & Merge
    @JoinTable(name="utilisateur_role",joinColumns = @JoinColumn(name = "utilisateur_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role = new HashSet<>();

    public Utilisateur(String nom, String prenom, String password, String username, String photo, String email, String matricule) {
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
        this.username = username;
        this.photo = photo;
        this.email = email;
        this.matricule = matricule;

       // this.role = role;

    }

    public Utilisateur(){}

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Set<Role> getRole() {
        return role;
    }

    public void setRole(Set<Role> role) {
        this.role = role;
    }
}
