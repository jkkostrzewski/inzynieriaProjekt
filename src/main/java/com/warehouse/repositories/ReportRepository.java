package com.warehouse.repositories;

import com.warehouse.models.Report;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReportRepository extends CrudRepository<Report, Integer> {

    Optional<Report> findByReportId(Integer reportId);
}
