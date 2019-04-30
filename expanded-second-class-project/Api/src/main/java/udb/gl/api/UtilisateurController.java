package udb.gl.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import udb.gl.*;
import udb.gl.exception.AppException;
import udb.gl.exception.RessourceNotFound;
import udb.gl.payload.*;
import udb.gl.security.CurrentUser;
import udb.gl.security.UtilisateurPrincipal;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/utilisateur")
public class UtilisateurController {

    UtilisateurRepository  utilisateurRepository;

    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("{username}")
    public ProfilUtilisateur getUserProfile(@PathVariable(value = "username") String username) {
        Utilisateur user = utilisateurRepository.findByUsername(username)
                .orElseThrow(() -> new RessourceNotFound("Utilisateur", "username", username));


        ProfilUtilisateur userProfile = new ProfilUtilisateur(user.getId(),user.getPrenom(), user.getNom(), user.getUsername(),user.getMatricule(), user.getCreatedAt());

        return userProfile;
    }


    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UtilisateurSummary showprofile(@CurrentUser UtilisateurPrincipal currentUser){
        UtilisateurSummary utilisateurSummary = new UtilisateurSummary(currentUser.getId(),currentUser.getUsername(),currentUser.getPrenom());
        return utilisateurSummary;

    }


    @GetMapping("admin/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Utilisateur> getAll(){
        return utilisateurRepository.findAll();
    }

    @PostMapping("/admin/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createUtilisateur(@Valid @RequestBody CreateUtilisateur createUtilisateur){
     //   if (utilisateurRepository.existsByUsername(createUtilisateur.getUsername())){
       //     return  new ResponseEntity(new ApiResponse(false, "Ce Nom d'utilisateur est déjà pris!"),HttpStatus.BAD_REQUEST);
       // }

   //     if (utilisateurRepository.existsByUsername(createUtilisateur.getUsername())){
     //       return  new ResponseEntity(new ApiResponse(false, "Ce Email est déjà pris!"),HttpStatus.BAD_REQUEST);
       // }

        //Creating the User
        Utilisateur utilisateur = new Utilisateur(createUtilisateur.getNom(),createUtilisateur.getPrenom(),createUtilisateur.getPassword(),createUtilisateur.getUsername(),createUtilisateur.getEmail(),createUtilisateur.getPhoto(),createUtilisateur.getMatricule());
        utilisateur.setPassword(passwordEncoder.encode(utilisateur.getPassword()));
        List<String> roles = createUtilisateur.getRole();


        if(roles==null){
            System.out.println("ROLES IS NULL");
            return  new ResponseEntity(new ApiResponse(false, "le multiselect ne renvoi aucune donnée(ROLES = NULL)"),HttpStatus.BAD_REQUEST);

        }

        // Checking to see if my frontend implementation corresponds !!
        // TODO Could try for(RoleName role : RoleName.values) Loop to find in database But I will need to change The register set Role Methods!!
        // TODO If I have Time to work more on this project before february?/march? exams!!
        for (String r : roles) {
           if(r.equals(RoleName.ROLE_ADMIN.name())){
               Role roleUtilisateur = roleRepository.findByName(RoleName.ROLE_ADMIN) .orElseThrow(
                       ()->new AppException("Le Role de l'utilisateur n'est pas définit")
               );
               utilisateur.setRole(Collections.singleton(roleUtilisateur));
           }

            if(r.equals(RoleName.ROLE_SECRETAIRE.name())){
                Role roleUtilisateur = roleRepository.findByName(RoleName.ROLE_SECRETAIRE) .orElseThrow(
                        ()->new AppException("Le Role de l'utilisateur n'est pas définit")
                );
                utilisateur.setRole(Collections.singleton(roleUtilisateur));
            }

            if(r.equals(RoleName.ROLE_MEDECIN.name())){
                Role roleUtilisateur = roleRepository.findByName(RoleName.ROLE_MEDECIN) .orElseThrow(
                        ()->new AppException("Le Role de l'utilisateur n'est pas définit")
                );
                utilisateur.setRole(Collections.singleton(roleUtilisateur));
            }

            if(r.equals(RoleName.ROLE_PROSPECT.name())){
                Role roleUtilisateur = roleRepository.findByName(RoleName.ROLE_PROSPECT) .orElseThrow(
                        ()->new AppException("Le Role de l'utilisateur n'est pas définit")
                );
                utilisateur.setRole(Collections.singleton(roleUtilisateur));
            }

            //if(r.equals(RoleName.ROLE_USER.name())){
            //                Role roleUtilisateur = roleRepository.findByName(RoleName.ROLE_USER) .orElseThrow(
            //                        ()->new AppException("Le Role de l'utilisateur n'est pas définit")
            //                );
            //                utilisateur.setRole(Collections.singleton(roleUtilisateur));
            //            }
        }

        Role defaultRoleUtilisateur = roleRepository.findByName(RoleName.ROLE_USER) .orElseThrow(
                ()->new AppException("Le Role de l'utilisateur n'est pas définit")
        );

        utilisateur.setRole(Collections.singleton(defaultRoleUtilisateur));
        Utilisateur result = utilisateurRepository.save(utilisateur);

        //TODO See If I Need To redirect Somewhere else Later (To figure out Before Friday)!!
       URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/utilisateur")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Utilisateur Ajouté avec Succes!!"));

    }


}
