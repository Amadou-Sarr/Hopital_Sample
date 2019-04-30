package udb.gl.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import udb.gl.Utilisateur;
import udb.gl.UtilisateurRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UtilisateurRepository utilisateurRepository;


    @Transactional
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail)throws UsernameNotFoundException  {


        // Let people login with either username or email
        Utilisateur user = utilisateurRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
        );

        return UtilisateurPrincipal.create(user);

    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) {
        Utilisateur user = utilisateurRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UtilisateurPrincipal.create(user);
    }
}




