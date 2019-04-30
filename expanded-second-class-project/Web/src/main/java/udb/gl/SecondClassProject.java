package udb.gl;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@EnableJpaRepositories
@EntityScan(basePackages = {"udb.gl"},basePackageClasses = {SecondClassProject.class,
        Jsr310JpaConverters.class})
@ComponentScan(basePackages = {"udb.gl"})
@ServletComponentScan(basePackages = {"udb.gl"})
@SpringBootApplication
public class SecondClassProject {


        @PostConstruct
        void init() {
            TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        }

        public static void main(String[] args) {
            SpringApplication.run(SecondClassProject.class, args);
        }


}
