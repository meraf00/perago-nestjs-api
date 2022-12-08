<h1># perago-nestjs-api</h1>
Perago Information Systems's  NestJS API scaffold 
clone this repository .
execute  'install npm ' then
all the required dependence will be installed.
create a database named 'orga_structure'
execute 'nest start'. 
access and test your api via swagger 
http://localhost:3000/api

<h1> Requirements </h1>
<p style="text-align:justfy; color:blue">
Assume medium level organization management structure with different level of department/Office
Hierarchy. At the top of the Hierarch there is CEO and every department below a given hierarchy will
answer/Report to the immediate department in the organization structure hierarchy
</p>

<img src="https://user-images.githubusercontent.com/86113690/206536077-6433af41-bfd5-4778-8cec-e735a2871c0c.png"/>

<ol>
  <li>  Build web application using NestJS (version >= 9) for backend, PostgreSQL or SQL Server database as data 
store
  <pre>
a. Insert new structure/Department
    • Every Department must contain minimum information like Name, Description and Managing 
      Department to whom the department Report To etc.
b. Update previously saved structure/department
c. Display single structure/Department and when requested display immediate managing 
   structure/Department and structures/departments under its management. For example:
    • Department Name: CEO
    • Description: Chief Executive Officer
    • Click Here to display Managing Department: Managing Department-None
    • Click Here to display structures/departments under its management: CFO: CMO:  
 d. Display all structure/department according to hierarchy (You can use table or tree)
  </pre>  
  </li>
  <p>
  <h3> Note:</h3>
  <ul>
    <li> Every structure/department will answer/Report to one structure/department except CEO</li>
<li> The client wants to add or Update management structure at any time.</li>
<li>The development should consider separation of concern and maintainability.</li>
<li>The development should include Unit Test for the controller.</li>
<li>To test your API, use Postman or Swagge</li>
  </ul>
  </p>
  <p>
<h3>Reading Materials</h3>
<h4> Books</h4>
<ul>
  <li>Patterns, Principles and Practices of Domain Driven Design (Scott Millett Nick Tune)</li>
<li> Clean Architecture, A Craftsman’s Guide to Software Structure and Design, (Robert C Martin)</li>
<li>DDD Reference (Domain Driven Design Reference)</li>
<li>DDD Quickly (Domain Driven Design Quickly)</li>
  </ul>
  <h4> Links</h4>
<h4>For Backend</h4>
<ul>
  <li> <a href="https://docs.nestjs.com/"> Nest (NestJS) </a></li>
  <li> <a href="https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/"> DDD, Hexagonal, Onion, Clean, CQRS, … How I put it all together </li>   </li>
<li> <a href="https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/"> Command Query Responsibility Segregation (CQRS) pattern <a> </li>
<li><a href="https://www.ibm.com/cloud/architecture/architectures/event-driven-cqrs-pattern/"> What is the CQRS pattern? </a></li>
  </ul>
<h4>For Database<h4>
  <ul>
    <li><a href="https://www.postgresql.org/docs/9.6/postgres-fdw.html">  PostgreSQL Documentation </a></li>    
    <li> <a href="https://docs.microsoft.com/en-us/sql/sql-server/?view=sql-server-ver16"> SQL Serve </a>   </li>
    </ul>
</p>
</ol>
  
  
